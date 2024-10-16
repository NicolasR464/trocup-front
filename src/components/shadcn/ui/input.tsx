import * as React from 'react'

import { cn } from '@/components/shadcn/utils'
import { Label } from '@radix-ui/react-label'

import { ChevronUp, ChevronDown } from 'lucide-react'

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, ...props }, ref) => {
        if (type === 'number') {
            return (
                <div className='relative'>
                    <input
                        type={type}
                        className={cn(
                            'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 pr-8 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
                            className,
                        )}
                        ref={ref}
                        {...props}
                    />
                    <div className='absolute right-0 top-0 flex h-full flex-col'>
                        <button
                            type='button'
                            className='flex flex-1 items-center justify-center px-2 hover:bg-gray-100 focus:outline-none'
                            onClick={() => {
                                if (ref && 'current' in ref) {
                                    const input = ref.current
                                    if (input) {
                                        input.stepUp()
                                        input.dispatchEvent(
                                            new Event('input', {
                                                bubbles: true,
                                            }),
                                        )
                                    }
                                }
                            }}
                        >
                            <ChevronUp className='h-4 w-4' />
                        </button>
                        <button
                            type='button'
                            className='flex flex-1 items-center justify-center px-2 hover:bg-gray-100 focus:outline-none'
                            onClick={() => {
                                if (ref && 'current' in ref) {
                                    const input = ref.current
                                    if (input) {
                                        input.stepDown()
                                        input.dispatchEvent(
                                            new Event('input', {
                                                bubbles: true,
                                            }),
                                        )
                                    }
                                }
                            }}
                        >
                            <ChevronDown className='h-4 w-4' />
                        </button>
                    </div>
                </div>
            )
        }

        return (
            <input
                type={type}
                className={cn(
                    'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
                    className,
                )}
                ref={ref}
                {...props}
            />
        )
    },
)

export { Input }

interface InputNumberProps {
    className?: string
    value?: number
    onChange?: (value: number | undefined) => void
}

const InputNumber = React.forwardRef<HTMLInputElement, InputNumberProps>(
    ({ className, value, onChange, ...props }, ref) => {
        const inputRef = React.useRef<HTMLInputElement>(null)

        React.useImperativeHandle(
            ref,
            () => inputRef.current as HTMLInputElement,
        )

        const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            const newValue =
                event.target.value === ''
                    ? undefined
                    : Number(event.target.value)
            onChange?.(newValue as number)
        }

        return (
            <div className='relative inline-flex h-8 w-24 rounded-md border border-input'>
                <Input
                    min={0}
                    step='0.1'
                    type='number'
                    value={value?.toString() ?? ''}
                    onChange={handleChange}
                    className={cn(
                        'h-full w-full rounded-r-none border-none px-2 py-2 text-sm',
                        '[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none',
                        className,
                    )}
                    ref={inputRef}
                    {...props}
                />
            </div>
        )
    },
)

InputNumber.displayName = 'InputNumber'

export { InputNumber }
