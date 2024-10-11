'use client'
import React, { useEffect, useState } from 'react'
import type { FieldErrors } from 'react-hook-form'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'

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
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
} from '@/components/shadcn/ui/form'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/shadcn/ui/popover'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/shadcn/ui/tooltip'

import { useUserStore } from '@/stores/user'
import { getAddressSuggestions } from '@/utils/apiCalls/thirdPartyApis/addressSuggestions'
import { useCreateUser } from '@/utils/apiCalls/user/mutations'
import { pagePaths } from '@/utils/constants'
import { avatarPlaceholder } from '@/utils/constants/avatarPlaceholder'
import { getRandomAvatarUrl, getRandomUserPseudonym } from '@/utils/functions'

import type { AddressSuggestion } from '@/types/address/gouvApiCall'
import type { UserRegistration } from '@/types/formValidations/userRegistration'
import { userRegistrationSchema } from '@/types/formValidations/userRegistration'

import { Button } from '../shadcn/ui/button'
import { Input } from '../shadcn/ui/input'
import { cn } from '../shadcn/utils'
import { useAuth } from '@clerk/nextjs'
import { useDebouncedCallback } from '@mantine/hooks'
import { Avatar } from '@radix-ui/react-avatar'
import { Label } from '@radix-ui/react-label'
import type { AxiosError } from 'axios'
import { ChevronsUpDown, House, UserPen } from 'lucide-react'

/**
 * RegistrationForm component for user registration.
 *
 * This component renders a form for user onboarding. It is asking for the user's address, an avatar,
 * and a pseudonym.
 * @returns {React.JSX.Element} The rendered registration form
 */
export const RegistrationForm = (): React.JSX.Element => {
    const { mutateAsync, isPending } = useCreateUser()
    const [imageLoaded, setImageLoaded] = useState(false)
    const { getToken } = useAuth()
    const router = useRouter()
    const { setUserData } = useUserStore()

    // Set error message
    const [errorPseudo, setErrorPseudo] = useState<string | undefined>()

    const form = useForm<UserRegistration>({
        resolver: zodResolver(userRegistrationSchema),
        defaultValues: {
            pseudo: '',
            avatarUrl: '',
            addressInput: '',
            addressObject: undefined,
        },
    })

    const { control, watch, setValue, handleSubmit, register } = form

    const { fields, update } = useFieldArray({
        control,
        name: 'addressSuggestions',
        rules: {
            required: false,
        },
    })

    const [open, setOpen] = useState(false)

    // Set random avatar and pseudo on mount
    useEffect(() => {
        setValue('avatarUrl', getRandomAvatarUrl())
        setValue('pseudo', getRandomUserPseudonym())
    }, [setValue])

    const avatarUrl = watch('avatarUrl')
    const addressObject = watch('addressObject')
    const addressInput = watch('addressInput')

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

    /**
     * Handles form submission.
     *
     * This function is called when the form is submitted. It processes the form data,
     * gets a JWT token, prepares the data to send, and makes an API call to create a new user.
     * @param {UserRegistration} data - The form data
     * @returns {Promise<void>}
     */
    const onSubmit = async (data: UserRegistration): Promise<void> => {
        const { pseudo } = data

        const JWT = await getToken({ template: 'trocup-1' })

        if (!JWT) {
            router.push(`${pagePaths.HOME}?onboardingSuccess=false`)
            return
        }

        const dataToSend = {
            avatarUrl,
            pseudo: pseudo.trim(),
            ...(addressObject && { address: addressObject }),
        }

        await mutateAsync(
            {
                data: dataToSend,
                JWT,
            },
            {
                onSuccess: () => {
                    setUserData({
                        pseudo,
                        avatarUrl,
                        ...(addressObject && { address: addressObject }),
                    })

                    router.push(`${pagePaths.HOME}?onboardingSuccess=true`)
                },
                onError: (errorMsg) => {
                    if (
                        (errorMsg as AxiosError<{ error: string }>).response
                            ?.data.error === 'pseudo already in use'
                    )
                        setErrorPseudo('Ce pseudo est déjà pris.')

                    if (
                        (errorMsg as AxiosError<{ error: string }>).response
                            ?.data.error === 'email already in use'
                    )
                        router.push(`${pagePaths.HOME}?onboardingSuccess=false`)
                },
            },
        )
    }

    /**
     * Handles form validation errors.
     *
     * This function is called when form validation fails. It logs the validation errors
     * to the console for debugging purposes.
     * @param {FieldErrors<UserRegistration>} errors - The validation errors object
     * @returns {void}
     */
    const onError = (errors: FieldErrors<UserRegistration>): void => {
        if (errors.pseudo && errors.pseudo.type === 'too_small')
            setErrorPseudo(errors.pseudo.message ?? 'Ce pseudo est trop court.')

        if (errors.pseudo && errors.pseudo.type === 'too_big')
            setErrorPseudo(errors.pseudo.message ?? 'Ce pseudo est trop long.')
    }

    return (
        <Form {...form}>
            <form
                // eslint-disable-next-line @typescript-eslint/no-misused-promises
                onSubmit={handleSubmit(onSubmit, onError)}
                className='m-1 flex flex-col items-center justify-center space-y-8 rounded-lg border-2 border-blue-800 p-4'
            >
                <div className='flex min-h-20 flex-wrap items-center justify-center'>
                    <div className='flex flex-col items-center'>
                        {/** User Avatar URL - hidden to the user */}
                        <Controller
                            control={control}
                            name='avatarUrl'
                            render={({ field: { onChange } }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            type='hidden'
                                            onChange={onChange}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        {/** Avatar Image */}
                        <Avatar>
                            {!!avatarUrl && (
                                <Image
                                    src={avatarUrl}
                                    alt='Avatar'
                                    width={100}
                                    height={100}
                                    priority
                                    onLoad={() => {
                                        setImageLoaded(true)
                                    }}
                                    placeholder={avatarPlaceholder}
                                />
                            )}
                            {!avatarUrl && (
                                <Image
                                    src={avatarPlaceholder}
                                    alt='Avatar'
                                    width={100}
                                    height={100}
                                    priority
                                />
                            )}
                        </Avatar>

                        {/** Change Avatar Button */}
                        <TooltipProvider>
                            <Tooltip delayDuration={500}>
                                <TooltipTrigger asChild>
                                    <Button
                                        className='mt-1'
                                        disabled={!imageLoaded}
                                        type='button'
                                        onClick={() => {
                                            setImageLoaded(false)

                                            setValue(
                                                'avatarUrl',
                                                getRandomAvatarUrl(),
                                            )
                                        }}
                                    >
                                        <UserPen className='mr-2 h-4 w-4' />
                                        {'Ton avatar'}
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>{'Change ton avatar'}</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>

                    {/** User Pseudo */}
                    <Controller
                        control={control}
                        name='pseudo'
                        render={({ field: { onChange, onBlur, value } }) => (
                            <FormItem className='mt-2 self-end px-4'>
                                <Label
                                    className={cn(
                                        'flex flex-row justify-between',
                                        !!errorPseudo && 'text-red-500',
                                    )}
                                >
                                    {'Ton Pseudo'}
                                </Label>
                                <FormDescription>
                                    {!!errorPseudo && (
                                        <p className='text-red-500'>
                                            {errorPseudo}
                                        </p>
                                    )}
                                </FormDescription>
                                <FormControl>
                                    <Input
                                        className='mt-0 min-w-[300px]'
                                        onChange={onChange}
                                        onBlur={onBlur}
                                        value={value}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                </div>

                {/** User Address */}
                <div className='flex justify-center'>
                    <FormField
                        control={control}
                        name='addressInput'
                        render={({ field }) => (
                            <FormItem className='flex flex-col'>
                                <FormLabel>{'Ton adresse'}</FormLabel>

                                <Popover
                                    open={open}
                                    onOpenChange={setOpen}
                                >
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                                variant='outline'
                                                role='combobox'
                                                aria-expanded={open}
                                                className={cn(
                                                    'min-w-full justify-between sm:min-w-[420px]',
                                                    !field.value &&
                                                        'text-muted-foreground',
                                                )}
                                                onClick={() => {
                                                    setOpen(true)
                                                }}
                                            >
                                                {!!field.value &&
                                                    !!addressObject &&
                                                    Object.keys(addressObject)
                                                        .length === 0 &&
                                                    field.value}

                                                {!!addressObject &&
                                                    Object.keys(addressObject)
                                                        .length > 0 &&
                                                    addressObject.label}

                                                {!field.value &&
                                                    !!addressObject &&
                                                    Object.keys(addressObject)
                                                        .length === 0 &&
                                                    'Rentre ton adresse'}
                                                <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>

                                    <PopoverContent className='w-[300px] p-0'>
                                        <Command>
                                            <CommandInput
                                                value={field.value}
                                                placeholder='Cherche ton adresse'
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
                                                    {addressInput &&
                                                    addressInput.length > 3 ? (
                                                        'Aucune adresse trouvée'
                                                    ) : (
                                                        <div className='flex justify-center'>
                                                            <House />
                                                        </div>
                                                    )}
                                                </CommandEmpty>

                                                <CommandGroup>
                                                    {fields.map(
                                                        (suggestion, index) => (
                                                            <CommandItem
                                                                className='cursor-pointer'
                                                                key={
                                                                    suggestion.id
                                                                }
                                                                value={
                                                                    suggestion
                                                                        .properties
                                                                        .label
                                                                }
                                                                onSelect={() => {
                                                                    setValue(
                                                                        'addressObject',
                                                                        {
                                                                            ...suggestion.properties,
                                                                            label: suggestion
                                                                                .properties
                                                                                .label,
                                                                        },
                                                                    )
                                                                    setOpen(
                                                                        false,
                                                                    )
                                                                }}
                                                            >
                                                                <span
                                                                    {...register(
                                                                        `addressSuggestions.${index}.properties.label`,
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

                {/** Submit Button */}
                <Button
                    type='submit'
                    disabled={!!isPending}
                >
                    {isPending ? 'Enregistrement…' : 'Enregister'}
                </Button>
            </form>
        </Form>
    )
}
