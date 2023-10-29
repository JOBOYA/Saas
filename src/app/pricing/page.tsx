import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import UpgradeButton from '@/components/UpgradeButton'
import { buttonVariants } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { PLANS } from '@/config/stripe'
import { cn } from '@/lib/utils'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import {
  ArrowRight,
  Check,
  HelpCircle,
  Minus,
} from 'lucide-react'
import Link from 'next/link'

const Page = () => {
  const { getUser } = getKindeServerSession()
  const user = getUser()

  const pricingItems = [
    {
      plan: 'Gratuit',
      tagline: 'Pour les petits projets annexes.',
      quota: 10,
      features: [
        {
          text: '5 pages par PDF',
          footnote: 'Le nombre maximal de pages par fichier PDF.'
        },
        {
          text: 'Limite de taille de fichier de 4 Mo',
          footnote: 'La taille maximale d’un seul fichier PDF.'
        },
        {
          text: 'Interface adaptée aux mobiles'
        },
        {
          text: 'Réponses de meilleure qualité',
          footnote: 'Des réponses algorithmiques améliorées pour une meilleure qualité de contenu',
          négatif: true
        },
        {
          text: 'Support prioritaire',
          negative: true
        }
      ]
    },
    {
      plan: 'Pro',
      tagline: 'Pour les projets plus importants avec des besoins plus élevés.',
      quota: PLANS.find((p) => p.slug === 'pro')!.quota,
      features: [
        {
          text: '25 pages par PDF',
          footnote: 'Le nombre maximal de pages par fichier PDF.'
        },
        {
          text: 'Limite de taille de fichier de 16 Mo',
          footnote: 'La taille maximale d’un seul fichier PDF.'
        },
        {
          text: 'Interface adaptée aux mobiles'
        },
        {
          text: 'Réponses de meilleure qualité',
          footnote: 'Des réponses algorithmiques améliorées pour une meilleure qualité de contenu'
        },
        {
          text: 'Support prioritaire'
        }
      ]
    }
  ]

  

  return (
    <>
      <MaxWidthWrapper className='mb-8 mt-24 text-center max-w-5xl'>
        <div className='mx-auto mb-10 sm:max-w-lg'>
          <h1 className='text-6xl font-bold sm:text-7xl'>
          Abonnements
          </h1>
          <p className='mt-5 text-gray-600 sm:text-lg'>
          Que vous souhaitiez simplement essayer notre service ou que vous ayez des besoins plus spécifiques, nous avons ce qu&apos;il vous faut.
          </p>
        </div>

        <div className='pt-12 grid grid-cols-1 gap-10 lg:grid-cols-2 text-black '>
          <TooltipProvider>
            {pricingItems.map(
              ({ plan, tagline, quota, features }) => {
                const price =
                  PLANS.find(
                    (p) => p.slug === plan.toLowerCase()
                  )?.price.amount || 0

                return (
                  <div
                    key={plan}
                    className={cn(
                      'relative rounded-2xl bg-white shadow-lg',
                      {
                        'border-2 border-blue-600 shadow-blue-200':
                          plan === 'Pro',
                        'border border-gray-200':
                          plan !== 'Pro',
                      }
                    )}>
                    {plan === 'Pro' && (
                      <div className='absolute -top-5 left-0 right-0 mx-auto w-32 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 px-3 py-2 text-sm font-medium text-white'>
                        Mettez à niveau maintenant
                      </div>
                    )}

                    <div className='p-5'>
                      <h3 className='my-3 text-center font-display text-3xl font-bold'>
                        {plan}
                      </h3>
                      <p className='text-gray-500'>
                        {tagline}
                      </p>
                      <p className='my-5 font-display text-6xl font-semibold'>
                        €{price}
                      </p>
                      <p className='text-gray-500'>
                        par mois
                      </p>
                    </div>

                    <div className='flex h-20 items-center justify-center border-b border-t border-gray-200 bg-gray-50'>
                      <div className='flex items-center space-x-1'>
                        <p>
                          {quota.toLocaleString()} PDFs/mo
                          inclus
                        </p>

                        <Tooltip delayDuration={300}>
                          <TooltipTrigger className='cursor-default ml-1.5'>
                            <HelpCircle className='h-4 w-4 text-zinc-500' />
                          </TooltipTrigger>
                          <TooltipContent className='w-80 p-2'>
                          Combien de fichiers PDF vous pouvez télécharger par
                            mois.
                          </TooltipContent>
                        </Tooltip>
                      </div>
                    </div>

                    <ul className='my-10 space-y-5 px-8'>
                      {features.map(
                        ({ text, footnote, negative }) => (
                          <li
                            key={text}
                            className='flex space-x-5'>
                            <div className='flex-shrink-0'>
                              {negative ? (
                                <Minus className='h-6 w-6 text-gray-300' />
                              ) : (
                                <Check className='h-6 w-6 text-blue-500' />
                              )}
                            </div>
                            {footnote ? (
                              <div className='flex items-center space-x-1'>
                                <p
                                  className={cn(
                                    'text-gray-600',
                                    {
                                      'text-gray-400':
                                        negative,
                                    }
                                  )}>
                                  {text}
                                </p>
                                <Tooltip
                                  delayDuration={300}>
                                  <TooltipTrigger className='cursor-default ml-1.5'>
                                    <HelpCircle className='h-4 w-4 text-zinc-500' />
                                  </TooltipTrigger>
                                  <TooltipContent className='w-80 p-2'>
                                    {footnote}
                                  </TooltipContent>
                                </Tooltip>
                              </div>
                            ) : (
                              <p
                                className={cn(
                                  'text-gray-600',
                                  {
                                    'text-gray-400':
                                      negative,
                                  }
                                )}>
                                {text}
                              </p>
                            )}
                          </li>
                        )
                      )}
                    </ul>
                    <div className='border-t border-gray-200' />
                    <div className='p-5'>
                      {plan === 'Free' ? (
                        <Link
                          href={
                            user ? '/dashboard' : '/sign-in'
                          }
                          className={buttonVariants({
                            className: 'w-full',
                            variant: 'secondary',
                          })}>
                          {user ? 'Mettre à niveau mintenant' : 'S\'enregistrer'}
                          <ArrowRight className='h-5 w-5 ml-1.5' />
                        </Link>
                      ) : user ? (
                        <UpgradeButton />
                      ) : (
                        <Link
                          href='/sign-in'
                          className={buttonVariants({
                            className: 'w-full',
                          })}>
                          {user ? 'Mettre à niveau mintenant' : 'S\'enregistrer'}
                          <ArrowRight className='h-5 w-5 ml-1.5' />
                        </Link>
                      )}
                    </div>
                  </div>
                )
              }
            )}
          </TooltipProvider>
        </div>
      </MaxWidthWrapper>
    </>
  )
}

export default Page
