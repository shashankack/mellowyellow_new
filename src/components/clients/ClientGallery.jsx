import { useEffect, useMemo, useState } from "react";
import Masonry from "../Masonry";

const measureImage = (src) =>
  new Promise((resolve) => {
    const img = new Image();
    img.onload = () =>
      resolve({
        width: img.naturalWidth || 600,
        height: img.naturalHeight || 800,
      });
    img.onerror = () => resolve({ width: 600, height: 800 });
    img.src = src;
  });

const GALLERY_COLUMNS = {
  columnQueries: ["(min-width:1100px)", "(min-width:700px)", "(min-width:480px)"],
  columnValues: [3, 2, 2],
  columnDefault: 1,
};

const ClientGallery = ({ client, onPreview }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    let cancelled = false;

    Promise.all(
      client.images.map(async (src, index) => {
        const { width, height } = await measureImage(src);
        return {
          id: `${client.slug}-${index}`,
          img: src,
          naturalWidth: width,
          naturalHeight: height,
        };
      }),
    ).then((nextItems) => {
      if (!cancelled) setItems(nextItems);
    });

    return () => {
      cancelled = true;
    };
  }, [client.slug, client.images]);

  const masonryItems = useMemo(() => items, [items]);

  if (!masonryItems.length) {
    return <div className="client-detail__gallery-loading" aria-hidden="true" />;
  }

  return (
    <div className="client-detail__gallery-masonry">
      <Masonry
        items={masonryItems}
        ease="power3.out"
        duration={0.6}
        stagger={0.05}
        animateFrom="bottom"
        scaleOnHover
        hoverScale={0.98}
        blurToFocus
        colorShiftOnHover={false}
        imageFit="contain"
        onItemClick={(item) =>
          onPreview?.({
            type: "image",
            src: item.img,
            title: client.title,
            description: client.description,
          })
        }
        {...GALLERY_COLUMNS}
      />
    </div>
  );
};

export default ClientGallery;
