'use client';

import { Crown, Wallet, Zap } from 'lucide-react';
import { Button } from '../ui/button';

interface Props {
  highLightedId: string | null;
  divRefs: React.RefObject<Record<string, HTMLDivElement | null>>;
}

const LandingPagePricing: React.FC<Props> = ({ highLightedId, divRefs }) => {
  const plans = [
    {
      name: 'Free',
      price: '$0',
      icon: <Wallet className="size-10 text-green-600" />,
      features: ['Browse images', 'Preview with watermark', 'Save favorites'],
      buttonText: 'Start Free',
      buttonVariant: 'outline' as const
    },
    {
      name: 'Pay-Per-View',
      price: 'From $1',
      icon: <Zap className="size-10 text-amber-600" />,
      features: ['Unlock images instantly', 'Secure payment checkout', 'No subscriptions needed'],
      buttonText: 'Explore Images',
      buttonVariant: 'default' as const
    },
    {
      name: 'Creator Pro',
      price: '$9.99/mo',
      icon: <Crown className="size-10 text-purple-600" />,
      features: ['Upload unlimited images', 'Set your own prices', 'Earn from every view', 'Analytics dashboard'],
      buttonText: 'Become a Creator',
      buttonVariant: 'default' as const
    }
  ];

  return (
    <div
      ref={(el: HTMLDivElement | null) => {
        divRefs.current['6'] = el;
      }}
      className={'py-12 bg-gradient-to-br rounded-2xl '}
      id="6"
    >
      <h2 className="text-center font-extrabold text-4xl mb-10">Pricing Plans</h2>
      <div className={'grid md:grid-cols-3 gap-8 max-w-6xl mx-auto px-6 '}>
        {plans.map((plan, i) => (
          <div
            key={i}
            className={`border rounded-2xl shadow-lg p-6 flex flex-col justify-between hover:scale-105 transition-transform ${
              highLightedId === '6' ? 'bg-gradient-to-r' : 'bg-accent'
            }`}
          >
            <div className="flex flex-col items-center space-y-3">
              {plan.icon}
              <h3 className="text-2xl font-bold">{plan.name}</h3>
              <p className="text-3xl font-extrabold">{plan.price}</p>
            </div>
            <ul className="mt-6 space-y-2 text-gray-700">
              {plan.features.map((f, idx) => (
                <li key={idx} className="flex items-center space-x-2">
                  <span className="text-green-600">✔</span>
                  <span className="dark:text-white">{f}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 text-center">
              <Button size="lg" variant={plan.buttonVariant}>
                {plan.buttonText}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LandingPagePricing;
