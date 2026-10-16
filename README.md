# cosmomateria.com

Sitio de CosmoMateria, estudio de comunicación y producción dirigido por April Cosmic.
HTML, CSS y JS sin dependencias ni paso de compilación, listo para GitHub.

## Estructura

```
index.html          Página principal
404.html            Página de error
css/styles.css      Estilos
js/main.js          Menú, cielo de estrellas, videos y animaciones
assets/img/         Logos, pósters, foto, íconos
CNAME               Dominio propio (cosmomateria.com)
.nojekyll           Le dice a GitHub Pages que publique los archivos tal cual
```

## Publicar con GitHub Pages

1. Haz commit y push de esta carpeta a `main`.
2. En GitHub: **Settings → Pages**.
3. En *Build and deployment*, Source: **Deploy from a branch**, Branch: **main**, carpeta **/ (root)**. Guardar.
4. En *Custom domain* debe aparecer `cosmomateria.com` (lo toma del archivo CNAME). Guardar.
5. Cuando el DNS esté listo, activa **Enforce HTTPS**.

## DNS (en donde compraste el dominio)

Registros para el dominio raíz `cosmomateria.com`:

| Tipo | Nombre | Valor |
|------|--------|-------|
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |
| CNAME | www | aprilcosmic.github.io |

Borra cualquier otro registro A o CNAME de `@` o `www` que apunte a otro lado (por ejemplo, una página de estacionamiento del registrador). Los cambios pueden tardar desde minutos hasta 24 horas.

## Editar contenido

Todo el texto está en `index.html`. Para cambiar una imagen, reemplaza el archivo en `assets/img/` con el mismo nombre.
