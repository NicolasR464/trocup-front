import { RegistrationForm } from '@/components/forms/userRegistration'

import { auth } from '@clerk/nextjs/server'

const Home = async (): Promise<React.JSX.Element> => {
    const { getToken } = auth()

    const JWT = await getToken({ template: 'trocup-1' })

    return (
        <div className='flex min-h-screen flex-col items-center justify-start p-24'>
            {!!JWT && <RegistrationForm JWT={JWT} />}
        </div>
    )
}

export default Home
