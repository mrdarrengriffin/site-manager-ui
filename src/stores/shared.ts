import { defineStore } from "pinia";
import { useRoute, type RouteLocationRaw } from "vue-router";
import { useSiteStore } from "./site";
import router from "@/router";
import { reactive, ref, watch } from "vue";
import { useAccountStore } from "./account";

export const useSharedStore = defineStore("shared", () => {
    const siteStore = useSiteStore();
    const accountStore = useAccountStore();

    const data = reactive({
        apiURL: import.meta.env.APP_SERVER_URL,
        pluginData: {},
        sidebars: {
            contextual: {
                main: {
                    items: <Object[] | RouteLocationRaw[]>[
                        { label: "Home", path: "/", icon: "bi bi-house" },
                        { divider: true },
                        {
                            label: "Add Site",
                            path: "/sites/add",
                            icon: "bi bi-window-plus",
                        },
                        {
                            label: "Sites",
                            path: "/sites",
                            icon: "bi bi-window-stack",
                        },
                        { divider: "Core" },
                        {
                            label: "Plugins",
                            path: "/sites/plugins",
                            icon: "bi bi-plug",
                        },
                        {
                            label: "Users",
                            path: "/sites/users",
                            icon: "bi bi-people",
                        },
                        {
                            label: "Application Passwords",
                            path: "/sites/application-passwords",
                            icon: "bi bi-key",
                        },
                        { divider: "Additional" },
                        {
                            label: "Gravity Forms",
                            path: "/sites/gravity-forms",
                            icon: "bi bi-ui-checks",
                        },
                        {
                            label: "Contact Form 7",
                            path: "/sites/cf7-forms",
                            icon: "bi bi-ui-checks",
                        },
                    ],
                },
                site: {
                    items: <Object[] | RouteLocationRaw[]>[
                        {
                            label: "Back",
                            path: "/sites",
                            icon: "bi bi-arrow-left",
                        },
                        { divider: "Overview" },
                        {
                            label: "Dashboard",
                            name: "site-dashboard",
                            params: { uri: siteStore.routeSite()?.url },
                            icon: "bi bi-grid",
                        },
                        { divider: "Core Information" },
                        {
                            label: "Posts",
                            path: "site-posts",
                            icon: "bi bi-pen",
                            class: "disabled feature-soon",
                        },
                        {
                            label: "Users",
                            path: "site-users",
                            icon: "bi bi-people",
                            class: "disabled feature-soon",
                        },
                        {
                            label: "Plugins",
                            path: "site-plugins",
                            icon: "bi bi-plug",
                            class: "disabled feature-soon",
                        },
                        { divider: "Runner Information" },
                        {
                            label: "PageSpeed",
                            name: "site-pagespeed",
                            params: { uri: siteStore.routeSite()?.url },
                            icon: "bi bi-google",
                        },
                        { divider: "Manage" },
                        {
                            label: "Site Settings",
                            name: "site-settings",
                            params: { uri: siteStore.routeSite()?.url },
                            icon: "bi bi-gear",
                        },
                    ],
                },
                siteSettings: {
                    items: <Object[] | RouteLocationRaw[]>[
                        {
                            label: "Back",
                            name: "site-dashboard",
                            params: { uri: siteStore.routeSite()?.url },
                            icon: "bi bi-arrow-left",
                        },
                        {
                            label: "General",
                            name: "site-settings-general",
                            params: { uri: siteStore.routeSite()?.url },
                        }
                    ],
                },
                settings: {
                    items: <Object[] | RouteLocationRaw[]>[
                        {
                            label: "Back",
                            path: "/sites",
                            icon: "bi bi-arrow-left",
                        },
                        { divider: "Settings" },
                        { label: "General", name: "account-home"},
                        { label: "Plugins", name: "account-plugins"},
                        { divider: "Integrations", class: "d-none" }
                    ],
                },
            },
            footer: {
                items: <Object[] | RouteLocationRaw[]>[
                    { label: "Account", name: "account", icon: "bi bi-gear" },
                    {
                        label: accountStore?.account ? "Login" : "Logout",
                        name: accountStore?.account ? "login" : "logout",
                        icon: accountStore?.account
                            ? "bi-box-arrow-in-right"
                            : "bi-box-arrow-right",
                    },
                ],
            },
        },
    });

    // watch for route param changes
    watch(
        () => router.currentRoute.value.params,
        () => {
            const site = siteStore.routeSite();
            if (!site) return;

            data.sidebars.contextual.site.items.forEach((item: any) => {
                item.params = { uri: site.url };
            });

            data.sidebars.contextual.siteSettings.items.forEach((item: any) => {
                item.params = { uri: site.url };
            });
        }
    );

    return data;
});
