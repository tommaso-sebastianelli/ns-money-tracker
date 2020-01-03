import { trigger, state, style, transition, animate } from "@angular/animations";

export const ANIMATIONS = [
	trigger('pop', [
		state('false', style({
			transform: 'scale(0)',
			opacity: 0.5
		})),
		state('true', style({
			transform: 'scale(1)',
			opacity: 1
		})),
		transition('false <=> true', [
			animate('375ms 125ms ease-in')
		])
	])
];