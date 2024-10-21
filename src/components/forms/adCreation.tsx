/* eslint-disable react/jsx-handler-names */
'use client'
import React, { useEffect, useState } from 'react'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { Button } from '@/components/shadcn/ui/button'
import { Calendar } from '@/components/shadcn/ui/calendar'
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '@/components/shadcn/ui/command'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/shadcn/ui/form'
import { Input, InputNumber } from '@/components/shadcn/ui/input'
import { RadioGroup, RadioGroupItem } from '@/components/shadcn/ui/radio-group'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@/components/shadcn/ui/select'
import { Textarea } from '@/components/shadcn/ui/textarea'
import { cn } from '@/components/shadcn/utils'

import { useArticleStore } from '@/stores/article'
import { useUserStore } from '@/stores/user'
import type {
    ImageAnalysis,
    ProductAnalysisResponse,
} from '@/utils/apiCalls/local'
import { useProductDataAnalysis } from '@/utils/apiCalls/local/mutations'
import { getAddressSuggestions } from '@/utils/apiCalls/thirdPartyApis/addressSuggestions'
import {
    categoriesList,
    deliveryTypes,
    products,
    productStates,
    productStatus,
    sizeOptions,
} from '@/utils/constants/productValues'

import type { AddressSuggestion } from '@/types/address/gouvApiCall'
import type { Article, DeliveryType } from '@/types/article'
import { DeliveryTypeSchema, StateSchema, StatusSchema } from '@/types/article'
import type { ArticleFormData } from '@/types/formValidations/adCreation'
import {
    addressObjectEmpty,
    ArticleFormDataSchema,
} from '@/types/formValidations/adCreation'

import { useDebouncedCallback } from '@mantine/hooks'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@radix-ui/react-popover'
import { format } from 'date-fns'
import {
    Calendar as CalendarIcon,
    ChevronsUpDown,
    CircleX,
    House,
    HousePlus,
} from 'lucide-react'

const ArticleForm = (): React.JSX.Element => {
    const [newAddressOpen, setNewAddressOpen] = useState(false)
    const [isManufactureDateOpen, setIsManufactureDateOpen] = useState(false)
    const [isPurchaseDateOpen, setIsPurchaseDateOpen] = useState(false)
    const [analyzedProduct, setAnalyzedProduct] = useState<
        ProductAnalysisResponse | undefined
    >()

    // Extra CSS
    const addressInputClass = 'w-full sm:w-[420px]'

    // React Query mutations
    const {
        mutateAsync: mutateProductAnalysis,
        isPending: isProductAnalysisPending,
    } = useProductDataAnalysis()

    // Data stored in Zustand stores
    const { address: storedAddresses, isPremium } = useUserStore(
        (state) => state.user,
    )
    const analyzedImage = useArticleStore((state) => state.analysedImage)

    const setArticle = useArticleStore((state) => state.setArticle)

    const setOpenConfirmDialog = useArticleStore(
        (state) => state.setOpenConfirmDialog,
    )

    const form = useForm<ArticleFormData>({
        resolver: zodResolver(ArticleFormDataSchema),
        defaultValues: {
            adTitle: '',
            brand: '',
            model: '',
            description: '',
            manufactureDate: undefined,
            purchaseDate: undefined,
            state: undefined,
            status: StatusSchema.Enum.AVAILABLE,
            category: undefined,
            subCategory: undefined,
            size: undefined,
            deliveryType: DeliveryTypeSchema.Enum.PICKUP,
            dimensions: {
                length: 0,
                width: 0,
                height: 0,
                weight: 0,
            },
            savedUserAddressLabel: undefined,
            addressInput: '',
            newAddressObject: addressObjectEmpty,
            registeredAddressObject: addressObjectEmpty,
        },
    })

    const {
        reset,
        control,
        watch,
        setValue,
        handleSubmit,
        register,
        setError,
    } = form

    const { fields, update } = useFieldArray({
        control,
        name: 'addressSuggestions',
        rules: {
            required: false,
        },
    })

    // Watch user inputs dynamically
    const savedUserAddressLabelWatch = watch('savedUserAddressLabel')
    const addressInputWatch = watch('addressInput')
    const newAddressObjectWatch = watch('newAddressObject')
    const categoryWatch = watch('category')
    const subCategoryWatch = watch('subCategory')
    const stateWatch = watch('state')

    // Reset on image change
    useEffect(() => {
        reset()
    }, [reset, analyzedImage])

    // Prefill form values from the analyzed image
    useEffect(() => {
        if (analyzedImage.brand) setValue('brand', analyzedImage.brand)

        if (analyzedImage.category) setValue('category', analyzedImage.category)

        if (analyzedImage.state) setValue('state', analyzedImage.state)
    }, [analyzedImage, setValue])

    useEffect(() => {
        if (analyzedImage.subCategory && categoryWatch)
            setValue('subCategory', analyzedImage.subCategory)
    }, [analyzedImage, categoryWatch, setValue])

    /**
     * Handles the form submission.
     * @param {ArticleFormData} data - The form data to be submitted
     * @returns {Promise<void>}
     */
    const onSubmit = async (data: ArticleFormData): Promise<void> => {
        if (
            !data.newAddressObject.label &&
            !data.registeredAddressObject.label
        ) {
            setError('savedUserAddressLabel', {
                message: 'Tu dois choisir une adresse',
            })
            setError('addressInput', {
                message: 'Tu dois choisir une adresse',
            })

            return
        }

        const articleData: Partial<Article> & {
            analysedImageData: ImageAnalysis
        } = {
            analysedImageData: analyzedImage,
            adTitle: data.adTitle,
            ...(data.brand && { brand: data.brand }),
            ...(data.model && { model: data.model }),
            description: data.description,
            deliveryType: data.deliveryType as DeliveryType,
            ...(data.manufactureDate && {
                manufactureDate: data.manufactureDate,
            }),
            ...(data.purchaseDate && { purchaseDate: data.purchaseDate }),
            state: StateSchema.Enum[
                data.state as keyof typeof StateSchema.Enum
            ],
            category: data.category,
            subCategory: data.subCategory,
            // eslint-disable-next-line unicorn/explicit-length-check
            ...(data.size && { size: data.size }),
            ...(data.dimensions && { dimensions: data.dimensions }),
            ...(data.registeredAddressObject.label && {
                address: data.registeredAddressObject,
            }),
            ...(data.newAddressObject.label && {
                address: data.newAddressObject,
            }),
        }

        await mutateProductAnalysis(
            { formData: articleData },
            {
                onSuccess: (result: ProductAnalysisResponse) => {
                    console.log('🔥 mutateProductAnalysis onSuccess', result)

                    setArticle({
                        ...articleData,
                        price: result.content.estimatedValue,
                    })

                    setOpenConfirmDialog(true)
                },

                onError: (error) => {
                    console.error('❌ mutateProductAnalysis error', error)
                },
            },
        )
    }

    /**
     * Fetches address suggestions based on user input.
     *
     * This function is debounced to prevent excessive API calls. It only triggers
     * when the input length is greater than 3 characters.
     * @param {string} input - The user's input for address search
     * @returns {Promise<AddressSuggestion[]>} A promise that resolves to an array of address suggestions
     */
    const fetchAddressSuggestions = useDebouncedCallback(
        async (input: string): Promise<AddressSuggestion[]> => {
            if (input.length > 3) {
                const addresses = await getAddressSuggestions(input)

                let index = 0
                if (addresses)
                    for (const address of addresses) {
                        update(index, address)
                        index++
                    }

                if (!addresses) {
                    return []
                }
            }

            return []
        },
        500,
    )

    return (
        <Form {...form}>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className='mx-auto max-w-4xl space-y-8 rounded-lg bg-white p-6 shadow-md'
            >
                <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
                    {/* Ad Title Input */}
                    <FormField
                        control={control}
                        name='adTitle'
                        render={({ field }) => (
                            <FormItem className='col-span-full'>
                                <FormLabel className='text-lg font-semibold'>
                                    {'Titre de l’annonce'}
                                </FormLabel>
                                <FormMessage />
                                <FormControl>
                                    <Input
                                        className='mt-1'
                                        {...field}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    {/* Brand Input */}
                    <Controller
                        control={control}
                        name='brand'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className='text-lg font-semibold'>
                                    {'Marque de l’article'}
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        className='mt-1'
                                        {...field}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    {/* Model Input */}
                    <FormField
                        control={control}
                        name='model'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className='text-lg font-semibold'>
                                    {'Modèle de l’article'}
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        className='mt-1'
                                        {...field}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    {/* Category Select */}
                    <FormField
                        control={control}
                        name='category'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className='text-lg font-semibold'>
                                    {'Catégorie'}
                                </FormLabel>
                                <FormMessage />
                                <Select
                                    onValueChange={field.onChange}
                                    value={categoryWatch ?? field.value}
                                    defaultValue={categoryWatch}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder='Sélectionne une categorie' />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {categoriesList.map(
                                            (category, categoryIndex) => (
                                                <SelectItem
                                                    key={
                                                        category + categoryIndex
                                                    }
                                                    value={category}
                                                >
                                                    {
                                                        products.categories[
                                                            category
                                                        ].tag
                                                    }
                                                </SelectItem>
                                            ),
                                        )}
                                    </SelectContent>
                                </Select>
                            </FormItem>
                        )}
                    />

                    {/* Subcategory Select */}

                    <FormField
                        control={control}
                        name='subCategory'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className='text-lg font-semibold'>
                                    {'Sous-catégorie'}
                                </FormLabel>
                                <FormMessage />
                                <Select
                                    onValueChange={field.onChange}
                                    value={subCategoryWatch ?? field.value}
                                    defaultValue={subCategoryWatch}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder='Sélectionne une sous-catégorie' />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {!!categoryWatch &&
                                            Object.entries(
                                                products.categories[
                                                    categoryWatch as keyof typeof products.categories
                                                ].subcategories,
                                            )
                                                .sort(([, a], [, b]) =>
                                                    a.localeCompare(b),
                                                )
                                                .map(([key, value]) => (
                                                    <SelectItem
                                                        key={key + value}
                                                        value={key}
                                                    >
                                                        {value}
                                                    </SelectItem>
                                                ))}
                                    </SelectContent>
                                </Select>
                            </FormItem>
                        )}
                    />

                    {/* Description Textarea */}
                    <FormField
                        control={control}
                        name='description'
                        render={({ field }) => (
                            <FormItem className='col-span-full'>
                                <FormLabel className='text-lg font-semibold'>
                                    {'Description'}
                                </FormLabel>
                                <FormMessage />
                                <FormControl>
                                    <Textarea
                                        className='mt-1'
                                        {...field}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    {/* Manufacture Date Picker */}
                    <FormField
                        control={control}
                        name='manufactureDate'
                        render={({ field }) => (
                            <FormItem className='flex flex-col'>
                                <FormLabel className='text-lg font-semibold'>
                                    {'Date de fabrication'}
                                </FormLabel>
                                <Popover
                                    open={isManufactureDateOpen}
                                    onOpenChange={setIsManufactureDateOpen}
                                >
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                                variant='outline'
                                                className={cn(
                                                    'w-[240px] pl-3 text-left font-normal',
                                                    !field.value &&
                                                        'text-muted-foreground',
                                                )}
                                            >
                                                {field.value ? (
                                                    format(field.value, 'PPP')
                                                ) : (
                                                    <span>
                                                        {'Choisissez une date'}
                                                    </span>
                                                )}
                                                <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent
                                        className='z-[100] w-auto p-0'
                                        align='start'
                                    >
                                        <Calendar
                                            mode='single'
                                            selected={field.value}
                                            onSelect={(date) => {
                                                field.onChange(date)
                                                setIsManufactureDateOpen(false)
                                            }}
                                            disabled={(date) =>
                                                date > new Date() ||
                                                date < new Date('1900-01-01')
                                            }
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>

                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Purchase Date Picker */}
                    <FormField
                        control={control}
                        name='purchaseDate'
                        render={({ field }) => (
                            <FormItem className='flex flex-col'>
                                <FormLabel className='text-lg font-semibold'>
                                    {'Date d’achat'}
                                </FormLabel>
                                <Popover
                                    open={isPurchaseDateOpen}
                                    onOpenChange={setIsPurchaseDateOpen}
                                >
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                                variant='outline'
                                                className={cn(
                                                    'w-[240px] pl-3 text-left font-normal',
                                                    !field.value &&
                                                        'text-muted-foreground',
                                                )}
                                                onClick={() => {
                                                    setIsPurchaseDateOpen(true)
                                                }}
                                            >
                                                {field.value ? (
                                                    format(field.value, 'PPP')
                                                ) : (
                                                    <span>
                                                        {'Choisissez une date'}
                                                    </span>
                                                )}
                                                <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent
                                        className='z-50 w-auto p-0'
                                        align='start'
                                    >
                                        <Calendar
                                            mode='single'
                                            selected={field.value}
                                            onSelect={(date) => {
                                                field.onChange(date)
                                                setIsPurchaseDateOpen(false)
                                            }}
                                            disabled={(date) =>
                                                date > new Date() ||
                                                date < new Date('1900-01-01')
                                            }
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>

                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* State Select */}
                    <FormField
                        control={control}
                        name='state'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className='text-lg font-semibold'>
                                    {'État'}
                                </FormLabel>
                                <FormMessage />
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    value={stateWatch ?? field.value}
                                    defaultValue={stateWatch}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder='L’état de l’objet' />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {StateSchema.options.map(
                                            (state, stateIndex) => (
                                                <SelectItem
                                                    key={state + stateIndex}
                                                    value={state}
                                                >
                                                    {productStates[state]}
                                                </SelectItem>
                                            ),
                                        )}
                                    </SelectContent>
                                </Select>
                            </FormItem>
                        )}
                    />

                    {/* Status Select */}
                    <FormField
                        control={control}
                        name='status'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className='text-lg font-semibold'>
                                    {'Statut'}
                                </FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder='Select status' />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem
                                            key={StatusSchema.Enum.AVAILABLE}
                                            value={StatusSchema.Enum.AVAILABLE}
                                        >
                                            {
                                                productStatus[
                                                    StatusSchema.Enum.AVAILABLE
                                                ]
                                            }
                                        </SelectItem>
                                        <SelectItem
                                            key={StatusSchema.Enum.UNAVAILABLE}
                                            value={
                                                StatusSchema.Enum.UNAVAILABLE
                                            }
                                        >
                                            {
                                                productStatus[
                                                    StatusSchema.Enum
                                                        .UNAVAILABLE
                                                ]
                                            }
                                            <span className='text-red-500 opacity-[0.7]'>
                                                {' (Ne sera pas publié)'}
                                            </span>
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </FormItem>
                        )}
                    />

                    {/* Dimensions of the article */}
                    <div className='flex w-[250px] flex-wrap justify-between'>
                        {/* Dimensions of the article : Length */}
                        <FormField
                            control={control}
                            name='dimensions.length'
                            render={({ field }) => (
                                <FormItem className='m-2 flex flex-col'>
                                    <FormMessage />
                                    <FormLabel className='text-base'>
                                        {'Longueur (cm)'}
                                    </FormLabel>
                                    <FormControl>
                                        <InputNumber
                                            className='mt-1'
                                            {...field}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        {/* Dimensions of the article : Width */}
                        <FormField
                            control={control}
                            name='dimensions.width'
                            render={({ field }) => (
                                <FormItem className='m-2 flex flex-col'>
                                    <FormLabel className='text-base'>
                                        {'Largeur (cm)'}
                                    </FormLabel>
                                    <FormControl>
                                        <InputNumber
                                            className='mt-1'
                                            {...field}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        {/* Dimensions of the article : Height */}
                        <FormField
                            control={control}
                            name='dimensions.height'
                            render={({ field }) => (
                                <FormItem className='m-2 flex flex-col'>
                                    <FormLabel className='text-base'>
                                        {'Hauteur (cm)'}
                                    </FormLabel>
                                    <FormControl>
                                        <InputNumber
                                            className='mt-1'
                                            {...field}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        {/* Dimensions of the article : Weight */}
                        <FormField
                            control={control}
                            name='dimensions.weight'
                            render={({ field }) => (
                                <FormItem className='m-2 flex flex-col'>
                                    <FormLabel className='text-base'>
                                        {'Poids (kl)'}
                                    </FormLabel>
                                    <FormControl>
                                        <InputNumber
                                            className='mt-1'
                                            {...field}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    </div>

                    {/** Size Select */}
                    <FormField
                        control={control}
                        name='size'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className='text-lg font-semibold'>
                                    {'Taille'}
                                </FormLabel>
                                <FormControl>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder='Sélectionner une taille' />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {sizeOptions.map(
                                                (group, groupIndex) => (
                                                    <SelectGroup
                                                        key={`size-group-${group.label}-${groupIndex}`}
                                                    >
                                                        <SelectLabel>
                                                            {group.label}
                                                        </SelectLabel>
                                                        {group.options.map(
                                                            (
                                                                size,
                                                                sizeIndex,
                                                            ) => (
                                                                <SelectItem
                                                                    key={`size-option-${group.label}-${size}-${groupIndex}-${sizeIndex}`}
                                                                    value={`${group.label}-${size}`}
                                                                >
                                                                    {size}
                                                                </SelectItem>
                                                            ),
                                                        )}
                                                    </SelectGroup>
                                                ),
                                            )}
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    {/** Saved user addresses Select */}
                    {!!storedAddresses && storedAddresses.length > 0 && (
                        <div className='flex justify-center'>
                            <FormField
                                control={control}
                                name='savedUserAddressLabel'
                                render={({ field }) => (
                                    <FormItem className={addressInputClass}>
                                        <FormLabel>
                                            {
                                                'Sélectionne une adresse enregistrée\u00A0: '
                                            }
                                        </FormLabel>
                                        <div className='flex items-center'>
                                            <Select
                                                onValueChange={(value) => {
                                                    setValue(
                                                        'newAddressObject',
                                                        addressObjectEmpty,
                                                    )

                                                    console.log(
                                                        '🔥 value',
                                                        value,
                                                    )

                                                    const parsedValue =
                                                        JSON.parse(value)

                                                    console.log(
                                                        '🔥 parsedValue',
                                                        parsedValue,
                                                    )

                                                    setValue(
                                                        'registeredAddressObject',
                                                        parsedValue,
                                                    )

                                                    field.onChange(value)
                                                }}
                                                value={field.value ?? ''}
                                            >
                                                <FormControl>
                                                    <SelectTrigger
                                                        className={cn(
                                                            addressInputClass,
                                                            'justify-between',
                                                        )}
                                                    >
                                                        <SelectValue
                                                            placeholder={
                                                                <House className='opacity-50' />
                                                            }
                                                        />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {storedAddresses.map(
                                                        (
                                                            address,
                                                            addressIndex,
                                                        ) => (
                                                            <SelectItem
                                                                key={
                                                                    address.label +
                                                                    addressIndex
                                                                }
                                                                value={JSON.stringify(
                                                                    address,
                                                                )}
                                                            >
                                                                {address.label}
                                                            </SelectItem>
                                                        ),
                                                    )}
                                                </SelectContent>
                                            </Select>
                                            {!!savedUserAddressLabelWatch && (
                                                <CircleX
                                                    className='ml-2 h-6 w-6 shrink-0 cursor-pointer text-red-500'
                                                    onClick={() => {
                                                        setValue(
                                                            'savedUserAddressLabel',
                                                            undefined,
                                                        )

                                                        setValue(
                                                            'registeredAddressObject',
                                                            addressObjectEmpty,
                                                        )
                                                    }}
                                                />
                                            )}
                                        </div>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    )}

                    {/** Article Address Input */}
                    <div className='mt-[9px] flex justify-center'>
                        <FormField
                            control={control}
                            name='addressInput'
                            render={({ field }) => (
                                <FormItem
                                    className={`flex flex-col ${addressInputClass} `}
                                >
                                    <FormLabel className='w-full'>
                                        {!!storedAddresses &&
                                        storedAddresses.length > 0
                                            ? 'Ou rajoute une nouvelle adresse :'
                                            : 'Rajoute une nouvelle adresse :'}
                                    </FormLabel>
                                    <Popover
                                        open={newAddressOpen}
                                        onOpenChange={setNewAddressOpen}
                                    >
                                        <div className='flex items-center'>
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button
                                                        variant='outline'
                                                        role='combobox'
                                                        aria-expanded={
                                                            newAddressOpen
                                                        }
                                                        className={cn(
                                                            addressInputClass,
                                                            'justify-between',
                                                            !field.value &&
                                                                'text-muted-foreground',
                                                        )}
                                                        onClick={() => {
                                                            if (!newAddressOpen)
                                                                setNewAddressOpen(
                                                                    true,
                                                                )
                                                        }}
                                                    >
                                                        {!newAddressObjectWatch.label && (
                                                            <HousePlus className='opacity-[0.8]' />
                                                        )}

                                                        {!!newAddressObjectWatch.label && (
                                                            <>
                                                                {
                                                                    newAddressObjectWatch.label
                                                                }
                                                                <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                                                            </>
                                                        )}
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            {!!newAddressObjectWatch.label && (
                                                <CircleX
                                                    className='ml-2 h-6 w-6 shrink-0 cursor-pointer text-red-500'
                                                    onClick={() => {
                                                        setValue(
                                                            'newAddressObject',
                                                            addressObjectEmpty,
                                                        )
                                                        setNewAddressOpen(false)
                                                    }}
                                                />
                                            )}
                                        </div>

                                        <PopoverContent className='w-[300px] p-0'>
                                            <Command>
                                                <CommandInput
                                                    value={field.value}
                                                    placeholder='Cherche une nouvelle adresse'
                                                    onValueChange={(value) => {
                                                        const sanitizedValue =
                                                            value.replaceAll(
                                                                ',',
                                                                '',
                                                            )

                                                        field.onChange(
                                                            sanitizedValue,
                                                        )

                                                        fetchAddressSuggestions(
                                                            sanitizedValue,
                                                        )
                                                    }}
                                                />
                                                <CommandList>
                                                    <CommandEmpty>
                                                        {addressInputWatch &&
                                                        addressInputWatch.length >
                                                            3 ? (
                                                            'Aucune adresse trouvée'
                                                        ) : (
                                                            <div className='flex justify-center'>
                                                                <HousePlus />
                                                            </div>
                                                        )}
                                                    </CommandEmpty>

                                                    <CommandGroup>
                                                        {fields.map(
                                                            (
                                                                suggestion,
                                                                suggestionIndex,
                                                            ) => (
                                                                <CommandItem
                                                                    className='cursor-pointer'
                                                                    key={
                                                                        suggestion.id +
                                                                        suggestionIndex
                                                                    }
                                                                    value={
                                                                        suggestion
                                                                            .properties
                                                                            .label
                                                                    }
                                                                    onSelect={() => {
                                                                        setValue(
                                                                            'newAddressObject',
                                                                            {
                                                                                ...suggestion.properties,
                                                                                label: suggestion
                                                                                    .properties
                                                                                    .label,
                                                                            },
                                                                        )
                                                                        setNewAddressOpen(
                                                                            false,
                                                                        )

                                                                        setValue(
                                                                            'savedUserAddressLabel',
                                                                            undefined,
                                                                        )

                                                                        setValue(
                                                                            'registeredAddressObject',
                                                                            addressObjectEmpty,
                                                                        )
                                                                    }}
                                                                >
                                                                    <span
                                                                        {...register(
                                                                            `addressSuggestions.${suggestionIndex}.properties.label`,
                                                                        )}
                                                                    >
                                                                        {
                                                                            suggestion
                                                                                .properties
                                                                                .label
                                                                        }
                                                                    </span>
                                                                </CommandItem>
                                                            ),
                                                        )}
                                                    </CommandGroup>
                                                </CommandList>
                                            </Command>
                                        </PopoverContent>
                                    </Popover>
                                </FormItem>
                            )}
                        />
                    </div>

                    {/* Delivery Type Checkboxes */}

                    {!!isPremium && (
                        <FormField
                            control={control}
                            name='deliveryType'
                            render={({ field }) => (
                                <FormItem className='space-y-3'>
                                    <FormLabel className='text-lg font-semibold'>
                                        {'Type de livraison'}
                                    </FormLabel>
                                    <FormMessage />
                                    <FormControl>
                                        <RadioGroup
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                            className='flex flex-col space-y-1'
                                        >
                                            <FormItem className='flex items-center space-x-3 space-y-0'>
                                                <FormControl>
                                                    <RadioGroupItem
                                                        value={
                                                            DeliveryTypeSchema
                                                                .Enum.SHIPPING
                                                        }
                                                    />
                                                </FormControl>
                                                <FormLabel className='font-normal'>
                                                    {deliveryTypes.SHIPPING}
                                                </FormLabel>
                                            </FormItem>

                                            <FormItem className='flex items-center space-x-3 space-y-0'>
                                                <FormControl>
                                                    <RadioGroupItem
                                                        value={
                                                            DeliveryTypeSchema
                                                                .Enum.PICKUP
                                                        }
                                                    />
                                                </FormControl>
                                                <FormLabel className='font-normal'>
                                                    {deliveryTypes.PICKUP}
                                                </FormLabel>
                                            </FormItem>
                                            <FormItem className='flex items-center space-x-3 space-y-0'>
                                                <FormControl>
                                                    <RadioGroupItem
                                                        disabled={!isPremium}
                                                        value={
                                                            DeliveryTypeSchema
                                                                .Enum.BOTH
                                                        }
                                                    />
                                                </FormControl>
                                                <FormLabel className='font-normal'>
                                                    {deliveryTypes.BOTH}
                                                </FormLabel>
                                            </FormItem>
                                        </RadioGroup>
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    )}
                </div>
                <div className='flex justify-center'>
                    <Button
                        type='submit'
                        className='w-full md:w-auto'
                    >
                        {'✨ Estimer la valeur de l’article'}
                    </Button>
                </div>
            </form>
        </Form>
    )
}

export default ArticleForm
