import Image from "next/image"

const photos = [
  {
    src: "/images/photo1.png",
    alt: "相册 1",
    objectPosition: "44% 26%",
  },
  {
    src: "/images/photo2.png",
    alt: "相册 2",
    objectPosition: "60% 28%",
  },
  {
    src: "/images/photo3.png",
    alt: "相册 3",
    objectPosition: "50% 30%",
  },
]

export function PhotoGallery() {
  return (
    <section className="py-8">
      <h2 className="text-sm text-muted-foreground mb-6 text-center tracking-[0.3em] uppercase">
        Gallery
      </h2>

      <div className="grid grid-cols-3 gap-3">
        {photos.map((photo, index) => (
          <div
            key={index}
            className="group relative aspect-square overflow-hidden rounded-[8px] border border-dashed border-neutral-400/70 shadow-sm bg-card/40 backdrop-blur-[2px]"
          >
            <div
              className="pointer-events-none absolute inset-0 z-0 bg-repeat opacity-[0.05]"
              style={{
                backgroundImage: "url(/paper-lace.svg)",
                backgroundSize: "88px 88px",
              }}
              aria-hidden
            />
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              className="relative z-[1] object-cover transition-transform duration-500 group-hover:scale-110"
              style={{ objectPosition: photo.objectPosition }}
            />
            <div className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-t from-foreground/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        ))}
      </div>
      
      <p className="text-center text-sm text-muted-foreground mt-4">
        点击右下角更改主题
      </p>
    </section>
  )
}
