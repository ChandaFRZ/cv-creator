import { Action, createAction, props } from '@ngrx/store';
import { MenuRoute } from 'src/app/shared/interfaces/menu-route.interface';

const entityName = '[Core] ';

export const updatePublicPages = createAction(entityName + 'Update public page request', props<{ pageTitle: string, host: string }>());

export const updateActiveMenu = createAction(entityName + 'Update menu request', props<{ activeMenuRoute: MenuRoute }>());
