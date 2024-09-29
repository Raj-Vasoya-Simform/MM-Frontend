import { trigger, state, style, transition, animate } from '@angular/animations';

export const slideFromTopAnimation = trigger('slideFromTop', [
  state('void', style({ transform: 'translateY(-100%)', opacity: 0 })),
  state('*', style({ transform: 'translateY(0)', opacity: 1 })),
  transition('void => *', animate('300ms ease-out')),
  transition('* => void', animate('300ms ease-in'))
]);
