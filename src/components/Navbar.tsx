
import Link from 'next/link'
import Contact  from './Contact'
import MaxWidthWrapper from './MaxWidthWrapper'
import { buttonVariants } from './ui/button'
import Image from 'next/image'
import {
  LoginLink,
  RegisterLink,
  getKindeServerSession,
} from '@kinde-oss/kinde-auth-nextjs/server'
import { ArrowRight } from 'lucide-react'
import UserAccountNav from './UserAccountNav'
import MobileNav from './MobileNav'
import { ModeToggle } from './ui/toggle'
import { LogoutLink } from '@kinde-oss/kinde-auth-nextjs/server'






const Navbar = () => {
  
  const { getUser } = getKindeServerSession()
  const user = getUser()

 
  
  return (
    <nav className='sticky h-14 inset-x-0 top-0 z-30 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all navbar'>
      <MaxWidthWrapper>
        <div className='flex h-14 items-center justify-between border-b border-zinc-200'>
        <Link href="/">
        
        <Image className="logo mt-4" src='/PlumeChat-1.svg' alt='PlumeChat Logo' width={130} height={100} />

        
      </Link>

   
      <MobileNav isAuth={!!user}  />
{ !!user && <div className="sm:hidden">
    <LogoutLink>
      <span className='text-black hover:bg-gray-200 rounded px-2 py-1 hover:shadow-md'>Déconnexion</span>
    </LogoutLink>
</div> }



      


  


          <div className='hidden items-center space-x-4 sm:flex'>
            {!user ? (
              <>
                <Link
                  href='/pricing'
                  className={buttonVariants({
                    variant: 'ghost',
                    size: 'sm',
                  })}>
                  Tarif
                </Link>
                <LoginLink
                  className={buttonVariants({
                    variant: 'ghost',
                    size: 'sm',
                  })}>
                  Connectez-vous
                </LoginLink>
                <RegisterLink
                  className={buttonVariants({
                    size: 'sm',
                  })}>
                  Commencer{' '}
                  <ArrowRight className='ml-1.5 h-5 w-5' />
                  
                </RegisterLink>
                <ModeToggle  />
              
              </>
            ) : (
              <>
                <Link
                  href='/dashboard'
                  className={buttonVariants({
                    variant: 'ghost',
                    size: 'sm',
                  })}>
                 Tableau de bord
                </Link>
               
               
                <UserAccountNav
                  name={
                    !user.given_name || !user.family_name
                      ? 'Your Account'
                      : `${user.given_name} ${user.family_name}`
                  }
                  email={user.email ?? ''}
                  imageUrl={user.picture ?? ''}
                  
                />
           
        
              <ModeToggle  />
              <Contact />
              

              </>
            )}
          </div>
        </div>
      
      </MaxWidthWrapper>
      
    </nav>
  )
}

export default Navbar
