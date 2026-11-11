import type { App } from 'vue';
import { defineAsyncComponent, markRaw } from 'vue';
import type { PluginAPI, PluginInstance, PluginStatic } from '@tak-ps/cloudtak';
import { IconPuzzle } from '@tabler/icons-vue';

// Written against CloudTAK v13.107.3 (app/plugin.ts). Check signatures against
// context/cloudtak-plugin-host.md for the version you build with.

const MenuPanel = defineAsyncComponent(() => import('./components/MenuPanel.vue'));

const MENU_KEY = '__SLUG__';
const ROUTE_NAME = 'home-menu-__SLUG__';
const ROUTE_PATH = '__SLUG__';
const FLOAT_UID = '__SLUG__-pane';

export default class __CLASS__ implements PluginInstance {
    api: PluginAPI;

    constructor(api: PluginAPI) {
        this.api = api;
    }

    static async install(_app: App, api: PluginAPI): Promise<PluginInstance> {
        return new __CLASS__(api);
    }

    // Called when the map has loaded. Register UI here, not in install().
    async enable(): Promise<void> {
        // The route must exist before the menu item, or menu.add() refuses it.
        this.api.routes.add({
            path: ROUTE_PATH,
            name: ROUTE_NAME,
            component: MenuPanel,
        }, 'home-menu');

        this.api.menu.add({
            key: MENU_KEY,
            label: '__LABEL__',
            route: ROUTE_NAME,
            tooltip: '__LABEL__',
            description: '__DESCRIPTION__',
            icon: markRaw(IconPuzzle),
        });
    }

    // Called when the map unloads. Remove everything enable() added.
    async disable(): Promise<void> {
        this.api.menu.remove(MENU_KEY);
        if (this.api.float.has(FLOAT_UID)) this.api.float.remove(FLOAT_UID);
        if (this.api.router.hasRoute(ROUTE_NAME)) this.api.router.removeRoute(ROUTE_NAME);
    }

    // Optional: open the same panel as a draggable floating pane over the map.
    openPane(): void {
        if (this.api.float.has(FLOAT_UID)) return;
        this.api.float.add({
            uid: FLOAT_UID,
            name: '__LABEL__',
            component: MenuPanel,
            width: 420,
            height: 520,
            x: 80,
            y: 80,
        });
    }
}

export const _typecheck: PluginStatic = __CLASS__;
