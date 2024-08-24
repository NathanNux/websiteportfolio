This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.



## Notes in creation 
page transitions can be only used in page router not in app router 
in page router for only text no framer transitons, it needs to be added context transition - Oliver larose has it, I have it on github, that just for text. GSAP transitions

Page transition using framer motion can be used here. 

Be aware of GSAP scrollTrigger, look into this project, useLayoutEffect will not work otherwise - so be aware of this issue on page router



// WIP: Optimise all of the videos, using HEVC format and lov framerrate with lower res. 720p should do on smaller components, 2K might be a lot to load

Use Video Tags Wisely: For self-hosted videos, use the <video> tag with attributes like preload="none" or preload="metadata" to control how much of the video is preloaded.

Unhandled Runtime Error
TypeError: Cannot read properties of null (reading 'material')

Source
src/components/ProjectsPage/Projects/Model/index.jsx (55:89) @ material

  53 |         if(mesh.current && mesh.current.material) {
  54 |             if(activeProject != null) {
> 55 |                 animate(opacity, 1, { duration: 0.5, onUpdate: progress => mesh.current.material.uniforms.uAlpha.value = progress})
     |                                                                                         ^
  56 |                 mesh.current.material.uniforms.uAlpha.value = 1;
  57 |                 mesh.current.material.uniforms.uTexture.value = textures[activeProject];
  58 |             }

  TypeError: Cannot read properties of null (reading 'setAttributeNS')

Source
src/components/common/Footer/index.jsx (39:18) @ setAttributeNS

  37 |     const setPath = useCallback((progress) => {
  38 |     const width = window.innerWidth * 0.7;
> 39 |     path.current.setAttributeNS(null, "d", `M0 250 Q${width * x} ${250 + progress}, ${width} 250`);
     |                  ^
  40 |     }, []);
  41 |
  42 |   const lerp = (x, y, z) => x * (1 - z) + y * z;
