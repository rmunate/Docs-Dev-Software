import {defineConfig} from 'vitepress';

export default defineConfig({
    title: "Docs Desarrollo",
    description: "Manual Practicas Desarrollo De Software.",
    lang: 'es',
    lastUpdated: true,
    base: '/Docs-Dev-Software',
    themeConfig: {
        logo: '/logo.png',
        nav: [
            {text: 'v0.1.0', link: '/'},
        ],
        sidebar: [
            {
                text: 'Introduccion',
                collapsed: false,
                items: [
                    //...
                ]
            }, {
                text: 'Google Cloud Console',
                collapsed: true,
                items: [
                    {text: 'Api Storage Laravel', link: '/pages/google-cloud-console/api-storage-laravel'},
                    {text: 'Aumentar Disco VM', link: '/pages/google-cloud-console/aumentar-disco-vm'},
                ]
            }, {
                text: 'Utilidades',
                collapsed: true,
                items: [
                    {text: 'Bateria Windows', link: '/pages/utilidades/bateria-windows'},
                    {text: 'Contraseñas Heidy SQL', link: '/pages/utilidades/claves-heidy-sql'},
                ]
            }, {
                text: 'Laravel Framework',
                collapsed: true,
                items: [
                    {text: 'Comandos', link: '/pages/laravel/console'},
                    {text: 'Exportables', link: '/pages/laravel/exports'},
                    {text: 'Helpers', link: '/pages/laravel/helpers'},
                ]
            }, {
                text: 'MAC OS',
                collapsed: true,
                items: [
                    {text: 'Instalación PHP', link: '/pages/mac-os/php'},
                    {text: 'Instalación Composer', link: '/pages/mac-os/composer'},
                    {text: 'Instalación Git', link: '/pages/mac-os/git'},
                    {text: 'Instalación MySQL', link: '/pages/mac-os/my-sql'},
                    {text: 'Instalación Putty', link: '/pages/mac-os/putty'},
                    {text: 'Instalación OpenSSL', link: '/pages/mac-os/open-ssl'},
                    {text: 'SQLServer Drivers', link: '/pages/mac-os/sql-server-drivers'},
                ]
            }, {
                text: 'Ubuntu',
                collapsed: true,
                items: [
                    {text: 'Comandos', link: '/pages/ubuntu/comandos'},
                    {text: 'Crear Llave PEM', link: '/pages/ubuntu/crear-llave-pem'},
                    {text: 'Instalación supervisor', link: '/pages/ubuntu/supervisor'},
                    {text: 'Instalación SQLServer', link: '/pages/ubuntu/sql-serve'},
                ]
            }
        ],

        socialLinks: [
            {icon: 'github', link: 'https://github.com/rmunate//Docs-Dev-Software'}
        ],
        search: {
            provider: 'local'
        }
    },
    head: [
        ['link', {
                rel: 'icon',
                href: '/Docs-Dev-Software/favicon.ico',
            }
        ],
        ['meta', {
                property: 'og:image',
                content: '/Docs-Dev-Software/logo.png'
            }
        ],
        ['meta', {
                property: 'og:image:secure_url',
                content: '/Docs-Dev-Software/logo.png'
            }
        ],
        ['meta', {
                property: 'og:image:width',
                content: '600'
            }
        ],
        ['meta', {
                property: 'og:image:height',
                content: '400'
            }
        ],
        ['meta', {
                property: 'og:title',
                content: 'Manual Practicas Desarrollo De Software'
            }
        ],
        ['meta', {
                property: 'og:description',
                content: 'Manual Practicas Desarrollo De Software.'
            }
        ],
        ['meta', {
                property: 'og:url',
                content: 'https://github.com/rmunate/Docs-Dev-Software'
            }
        ],
        ['meta', {
                property: 'og:type',
                content: 'website'
            }
        ]
    ],
})
