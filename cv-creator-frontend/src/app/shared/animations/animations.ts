import { AnimationMetadata, trigger, transition, style, animate } from '@angular/animations';

const animationDuration = 200;

export function animationEnterLeaveScale(): AnimationMetadata {
    return trigger('animLeaveScale', [
        transition(':enter', [
            style({ transform: 'scaleY(0.95) ', overflow: 'hidden', opacity: '0', height: 0 }),
            animate(animationDuration, style({ transform: 'scaleY(1)', overflow: 'visible', height: '*' }))
        ]),
        transition(':leave', [
            style({ transform: 'scaleY(1)', overflow: 'visible', opacity: '1', height: '*' }),
            animate(animationDuration, style({ transform: 'scaleY(0.95)', overflow: 'hidden', opacity: '0', height: 0 }))
        ])
    ]);
}

export function animationStandardEnterLeave(): AnimationMetadata {
    return trigger('animEnterLeave', [
        transition(':enter', [
            style({ transform: 'translateY(100%)', opacity: 0, overflow: 'visible', height: 0 }),
            animate(animationDuration, style({ transform: 'translateY(0)', opacity: 1, overflow: 'hidden', height: '*' }))
        ]),
        transition(':leave', [
            style({ transform: 'translateY(0)', opacity: 1, overflow: 'hidden', height: '*' }),
            animate(animationDuration, style({ transform: 'translateY(-100%)', opacity: 0, overflow: 'visible', height: 0 }))
        ])
    ]);
}

export function animationEnterTranslateLeft(): AnimationMetadata {
    return trigger('animationEnterTranslateLeft', [
        transition(':enter', [
            style({ transform: 'translateX(100%)', overflow: 'visible', opacity: 0, width: 0, height: 0 }),
            animate(animationDuration, style({ transform: 'translateX(0)', overflow: 'hidden', opacity: 1, width: '*', height: '*' }))
        ]),
        transition(':leave', [
            style({ transform: 'translateX(0)', overflow: 'hidden', opacity: 1, width: '*', height: '*' }),
            animate(animationDuration, style({ transform: 'translateX(100%)', overflow: 'visible', opacity: 0, width: 0, height: 0 }))
        ])
    ]);
}
