/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['res.cloudinary.com', 'images.unsplash.com', 'placehold.co'],
        dangerouslyAllowSVG: true,
    },
};

export default nextConfig;
