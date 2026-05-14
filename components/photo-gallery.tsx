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
            className="group relative aspect-square overflow-hidden rounded-xl border border-border/50 shadow-sm bg-card"
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              style={{ objectPosition: photo.objectPosition }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        ))}
      </div>
      
      <p className="text-center text-sm text-muted-foreground mt-4">
        点击右下角小花按钮可更换展示主题=v=
      </p>
    </section>
  )
}
