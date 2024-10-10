'use client'

import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { Button } from '@/components/shadcn/ui/button'
import { Calendar } from '@/components/shadcn/ui/calendar'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/shadcn/ui/form'
import { Input } from '@/components/shadcn/ui/input'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/shadcn/ui/select'
import { Textarea } from '@/components/shadcn/ui/textarea'

import { ArticleFormData } from '@/types/formValidations/adCreation'

import { format } from 'date-fns'
import { Calendar as CalendarIcon } from 'lucide-react'

const ArticleForm = () => {
    const form = useForm<ArticleFormData>({
        resolver: zodResolver(articleSchema),
        defaultValues: {
            adTitle: '',
            brand: '',
            model: '',
            description: '',
            price: 0,
            manufactureDate: new Date(),
            purchaseDate: new Date(),
            state: 'NEW',
            status: 'AVAILABLE',
            category: 'ELECTRONICS',
            subCategory: 'SMARTPHONE',
            deliveryType: ['PICKUP'],
            dimensions: {
                length: 0,
                width: 0,
                height: 0,
                weight: 0,
            },
        },
    })

    const onSubmit = (data: ArticleFormData) => {
        console.log(data)
        // Here you would typically send the data to your API
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className='space-y-8'
            >
                <FormField
                    control={form.control}
                    name='adTitle'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Ad Title</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder='Enter ad title'
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name='brand'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Brand</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder='Enter brand'
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name='model'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Model</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder='Enter model'
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name='description'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder='Enter description'
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name='price'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Price</FormLabel>
                            <FormControl>
                                <Input
                                    type='number'
                                    {...field}
                                    onChange={(e) =>
                                        field.onChange(
                                            parseFloat(e.target.value),
                                        )
                                    }
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name='manufactureDate'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Manufacture Date</FormLabel>
                            <FormControl>
                                <DatePicker
                                    date={field.value}
                                    setDate={(date) => field.onChange(date)}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name='purchaseDate'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Purchase Date</FormLabel>
                            <FormControl>
                                <DatePicker
                                    date={field.value}
                                    setDate={(date) => field.onChange(date)}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name='state'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>State</FormLabel>
                            <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                            >
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder='Select state' />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value='NEW'>New</SelectItem>
                                    <SelectItem value='USED'>Used</SelectItem>
                                    <SelectItem value='REFURBISHED'>
                                        Refurbished
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name='status'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Status</FormLabel>
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
                                    <SelectItem value='AVAILABLE'>
                                        Available
                                    </SelectItem>
                                    <SelectItem value='SOLD'>Sold</SelectItem>
                                    <SelectItem value='RESERVED'>
                                        Reserved
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name='category'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Category</FormLabel>
                            <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                            >
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder='Select category' />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value='ELECTRONICS'>
                                        Electronics
                                    </SelectItem>
                                    <SelectItem value='CLOTHING'>
                                        Clothing
                                    </SelectItem>
                                    <SelectItem value='FURNITURE'>
                                        Furniture
                                    </SelectItem>
                                    <SelectItem value='OTHER'>Other</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name='subCategory'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Sub Category</FormLabel>
                            <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                            >
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder='Select sub category' />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value='SMARTPHONE'>
                                        Smartphone
                                    </SelectItem>
                                    <SelectItem value='LAPTOP'>
                                        Laptop
                                    </SelectItem>
                                    <SelectItem value='TABLET'>
                                        Tablet
                                    </SelectItem>
                                    <SelectItem value='OTHER'>Other</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name='deliveryType'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Delivery Type</FormLabel>
                            <FormControl>
                                <div>
                                    <label>
                                        <input
                                            type='checkbox'
                                            value='PICKUP'
                                            checked={field.value.includes(
                                                'PICKUP',
                                            )}
                                            onChange={(e) => {
                                                const updatedValue = e.target
                                                    .checked
                                                    ? [...field.value, 'PICKUP']
                                                    : field.value.filter(
                                                          (v) => v !== 'PICKUP',
                                                      )
                                                field.onChange(updatedValue)
                                            }}
                                        />
                                        Pickup
                                    </label>
                                    <label>
                                        <input
                                            type='checkbox'
                                            value='SHIPPING'
                                            checked={field.value.includes(
                                                'SHIPPING',
                                            )}
                                            onChange={(e) => {
                                                const updatedValue = e.target
                                                    .checked
                                                    ? [
                                                          ...field.value,
                                                          'SHIPPING',
                                                      ]
                                                    : field.value.filter(
                                                          (v) =>
                                                              v !== 'SHIPPING',
                                                      )
                                                field.onChange(updatedValue)
                                            }}
                                        />
                                        Shipping
                                    </label>
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name='dimensions.length'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Length</FormLabel>
                            <FormControl>
                                <Input
                                    type='number'
                                    {...field}
                                    onChange={(e) =>
                                        field.onChange(
                                            parseFloat(e.target.value),
                                        )
                                    }
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name='dimensions.width'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Width</FormLabel>
                            <FormControl>
                                <Input
                                    type='number'
                                    {...field}
                                    onChange={(e) =>
                                        field.onChange(
                                            parseFloat(e.target.value),
                                        )
                                    }
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name='dimensions.height'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Height</FormLabel>
                            <FormControl>
                                <Input
                                    type='number'
                                    {...field}
                                    onChange={(e) =>
                                        field.onChange(
                                            parseFloat(e.target.value),
                                        )
                                    }
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name='dimensions.weight'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Weight</FormLabel>
                            <FormControl>
                                <Input
                                    type='number'
                                    {...field}
                                    onChange={(e) =>
                                        field.onChange(
                                            parseFloat(e.target.value),
                                        )
                                    }
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type='submit'>Submit</Button>
            </form>
        </Form>
    )
}

export default ArticleForm
