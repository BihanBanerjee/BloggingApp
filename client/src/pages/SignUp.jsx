import { Button, Label, TextInput } from 'flowbite-react'
import React from 'react'
import { Link } from 'react-router-dom'

function SignUp() {
  return (
    <div className='min-h-screen mt-20'>
      <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5'>
        {/* left */}
        <div className='flex-1'>
            <Link to="/" className="font-bold dark:text-white text-4xl">
              <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-300 to-purple-200 rounded-lg text-gray-800'>
                100xdev
              </span>
              <span className='text-gray-800'>
                Blogs
              </span>
            </Link>
            <p className='text-sm mt-5'>
              This is a demo project. You can sign up with your email and password or with Google.
            </p>
        </div>
        {/* right */}
        <div className='flex-1'>
            <form className='flex flex-col gap-4'>
              <div>
                <Label value='Your Username' />
                <TextInput 
                  type='text'
                  placeholder='Sita Rama'
                  id='username'
                />
              </div>

              <div>
                <Label value='Your Email' />
                <TextInput 
                  type='text'
                  placeholder='name@company.com'
                  id='email'
                />
              </div>


              <div>
                <Label value='Your Password' />
                <TextInput 
                  type='text'
                  placeholder='***************'
                  id='password'
                />
              </div>
              <Button gradientDuoTone="purpleToBlue" type='submit'>
                Sign Up
              </Button>
            </form>
            <div className='flex gap-2 text-sm mt-4'>
              <span>Already have an account?</span>
              <Link to='/signin' className='text-blue-500 underline'>
                Sign In
              </Link>

            </div>
        </div>

      </div>
    </div>
  )
}

export default SignUp