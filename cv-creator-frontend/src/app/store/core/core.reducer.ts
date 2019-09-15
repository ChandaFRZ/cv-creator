
import { MenuRoute } from 'src/app/shared/interfaces/menu-route.interface';
import { createReducer, Action, on } from '@ngrx/store';
import { environment } from 'src/environments/environment';
import * as CoreActions from './core.actions';

export interface ICoreState {
  menuRoutes: MenuRoute[];
  activeMenuRoute: MenuRoute;
}

export const initialState: ICoreState = {
  menuRoutes: [
    {
      icon: 'dashboard',
      route: 'home',
      title: 'Dashboard',
      group: 0,
      disabled: false,
      isExternal: false
    },
    {
      icon: 'visibility',
      route: '/module/progression',
      title: 'Progression',
      group: 1,
      disabled: false,
      isExternal: false
    },
    {
      icon: 'visibility',
      route: '/module/experience',
      title: 'Experience',
      group: 1,
      disabled: false,
      isExternal: false
    },
    {
      icon: 'visibility',
      route: '/module/knowledge',
      title: 'Knowledge',
      group: 1,
      disabled: false,
      isExternal: false
    },
    {
      icon: 'visibility',
      route: '/module/hobby',
      title: 'Hobby',
      group: 1,
      disabled: false,
      isExternal: false
    },
    {
      icon: 'contacts',
      route: 'account',
      title: 'User Details',
      group: 2,
      disabled: false,
      isExternal: false
    },
    {
      icon: 'settings',
      route: 'settings',
      title: 'Settings',
      group: 2,
      disabled: false,
      isExternal: false
    }
  ],
  activeMenuRoute: null
};

const reducer = createReducer(
  initialState,
  on(CoreActions.updatePublicPages, (state, { pageTitle, host }) => {
    let updatedMenu = state.menuRoutes
      .concat()
      .filter(route => route.group !== 3);
    updatedMenu = addPublicMenu(updatedMenu, pageTitle, host);
    return {
      ...state,
      menuRoutes: updatedMenu
    };
  }),
  on(CoreActions.updateActiveMenu, (state, { activeMenuRoute }) => {
    return {
      ...state,
      activeMenuRoute
    };
  })
);

export function coreReducer(state: ICoreState | undefined, action: Action) {
  return reducer(state, action);
}

function addPublicMenu(menuRoutes: MenuRoute[], title: string, host: string): MenuRoute[] {
  menuRoutes.push(
    {
      icon: 'public',
      route: 'public/' + title,
      title: 'Public Page',
      group: 3,
      disabled: false,
      isExternal: false
    }
  );
  menuRoutes.push(
    {
      icon: 'public',
      route: environment.baseURL + 'public/' + title,
      title: 'API Direct Link',
      group: 3,
      disabled: false,
      isExternal: true
    }
  );
  return menuRoutes;
}
