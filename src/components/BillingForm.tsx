import { getUserSubscriptionPlan } from '@/lib/stripe'
import { useToast } from './ui/use-toast'
import { trpc } from '@/app/_trpc/client'
import MaxWidthWrapper from './MaxWidthWrapper'
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card'
import { Button } from './ui/button'
import { Loader2 } from 'lucide-react'
import { format } from 'date-fns'

interface BillingFormProps {
  subscriptionPlan: Awaited<
    ReturnType<typeof getUserSubscriptionPlan>
  >
}

const BillingForm = ({
  subscriptionPlan,
}: BillingFormProps) => {
  const { toast } = useToast()

  const { mutate: createStripeSession, isLoading } =
    trpc.createStripeSession.useMutation({
      onSuccess: ({ url }) => {
        if (url) window.location.href = url
        if (!url) {
          toast({
            title: 'Il y a un problème...',
            description: 'Veuillez réessayer dans un instant',
            variant: 'destructive',
          })
        }
      },
    })


    const handleFormSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      
      if (subscriptionPlan.isSubscribed) {
        // Si l'utilisateur est abonné, rediriger vers la page de gestion Stripe
        window.location.href = "https://billing.stripe.com/p/login/00g8x42sy1p2c8g5kk";
      } else {
        // Si l'utilisateur n'est pas abonné, exécuter le code pour passer à Pro
        createStripeSession();
      }
    };
  

    

  return (
    <MaxWidthWrapper>
      <form
        className='mt-12'
        onSubmit={handleFormSubmit}>
        <Card>
          <CardHeader>
          <CardTitle >Subscription Plan</CardTitle>

            <CardDescription>
            Vous êtes actuellement sur le{' '}
            <strong>{subscriptionPlan.name}</strong> plan.
            </CardDescription>
          </CardHeader>

          <CardFooter className='flex flex-col items-start space-y-2 md:flex-row md:justify-between md:space-x-0'>
            <Button type='submit'>
              {isLoading ? (
                <Loader2 className='mr-4 h-4 w-4 animate-spin' />
              ) : null}
              {subscriptionPlan.isSubscribed
                ? 'Gérer mon abonnement'
                : 'Passer à Pro'}
            </Button>



            

            {subscriptionPlan.isSubscribed ? (
              <p className='rounded-full text-xs font-medium'>
                {subscriptionPlan.isCanceled
                  ? 'Votre forfait sera annulé le '
                  : 'Votre forfait se renouvelle le'}
                {format(
                  subscriptionPlan.stripeCurrentPeriodEnd!,
                  'dd.MM.yyyy'
                )}
                .
              </p>
            ) : null}
          </CardFooter>
        </Card>
      </form>
    </MaxWidthWrapper>
  )
}

export default BillingForm