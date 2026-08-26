import {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  Search,
  X,
  ZoomIn,
} from "lucide-react";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=900";

export default function ProductGallery({
  images = [],
}) {
  const safeImages =
    images.length > 0
      ? images
      : [FALLBACK_IMAGE];

  const [selectedImage, setSelectedImage] =
    useState(
      safeImages[0] || FALLBACK_IMAGE
    );

  const [isZooming, setIsZooming] =
    useState(false);

  const [zoomPosition, setZoomPosition] =
    useState({
      x: 50,
      y: 50,
    });

  const [isModalOpen, setIsModalOpen] =
    useState(false);

  const [modalZoom, setModalZoom] =
    useState(false);

  const imageContainerRef =
    useRef(null);

  useEffect(() => {
    setSelectedImage(
      safeImages[0] || FALLBACK_IMAGE
    );

    setModalZoom(false);
  }, [images]);

  useEffect(() => {
    if (!isModalOpen) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow =
      "hidden";

    function handleEscape(event) {
      if (event.key === "Escape") {
        setIsModalOpen(false);
        setModalZoom(false);
      }
    }

    window.addEventListener(
      "keydown",
      handleEscape
    );

    return () => {
      document.body.style.overflow = "";

      window.removeEventListener(
        "keydown",
        handleEscape
      );
    };
  }, [isModalOpen]);

  function handleImageError(event) {
    const image = event.currentTarget;

    if (
      image.src.includes(
        "photo-1523381210434-271e8be1f52b"
      )
    ) {
      return;
    }

    image.src = FALLBACK_IMAGE;

    setSelectedImage(
      FALLBACK_IMAGE
    );
  }

  function handleMouseMove(event) {
    const container =
      imageContainerRef.current;

    if (!container) {
      return;
    }

    const rect =
      container.getBoundingClientRect();

    const x =
      ((event.clientX - rect.left) /
        rect.width) *
      100;

    const y =
      ((event.clientY - rect.top) /
        rect.height) *
      100;

    setZoomPosition({
      x: Math.min(
        100,
        Math.max(0, x)
      ),

      y: Math.min(
        100,
        Math.max(0, y)
      ),
    });
  }

  function selectImage(image) {
    setSelectedImage(
      image || FALLBACK_IMAGE
    );

    setZoomPosition({
      x: 50,
      y: 50,
    });

    setIsZooming(false);
    setModalZoom(false);
  }

  function openModal() {
    setIsModalOpen(true);
    setModalZoom(false);
  }

  function closeModal() {
    setIsModalOpen(false);
    setModalZoom(false);
  }

  return (
    <>
      <div
        className="
          grid
          grid-cols-1
          lg:grid-cols-[110px_minmax(0,1fr)]
          gap-4
          sm:gap-6
          items-start
        "
      >
        {/* MINIATURAS */}

        <div
          className="
            flex
            lg:flex-col
            gap-3
            sm:gap-4
            order-2
            lg:order-1
            overflow-x-auto
            pb-2
            lg:pb-0
            scrollbar-hide
          "
        >
          {safeImages.map(
            (image, index) => (
              <button
                key={`${image}-${index}`}
                type="button"
                onClick={() =>
                  selectImage(image)
                }
                className={`
                  rounded-xl
                  sm:rounded-2xl
                  overflow-hidden
                  border-2
                  duration-300
                  flex-shrink-0

                  ${
                    selectedImage === image
                      ? "border-black"
                      : "border-gray-200 hover:border-black"
                  }
                `}
              >
                <img
                  src={
                    image ||
                    FALLBACK_IMAGE
                  }
                  alt={`Produto ${
                    index + 1
                  }`}
                  onError={
                    handleImageError
                  }
                  className="
                    block
                    w-20
                    h-20
                    sm:w-24
                    sm:h-24
                    object-cover
                  "
                />
              </button>
            )
          )}
        </div>

        {/* IMAGEM PRINCIPAL */}

        <div
          ref={imageContainerRef}
          onMouseEnter={() =>
            setIsZooming(true)
          }
          onMouseLeave={() =>
            setIsZooming(false)
          }
          onMouseMove={
            handleMouseMove
          }
          onClick={openModal}
          className="
            relative
            order-1
            lg:order-2
            w-full
            h-[420px]
            sm:h-[520px]
            md:h-[620px]
            lg:h-[650px]
            overflow-hidden
            rounded-2xl
            sm:rounded-3xl
            bg-gray-100
            cursor-zoom-in
          "
        >
          <img
            src={
              selectedImage ||
              FALLBACK_IMAGE
            }
            alt="Produto"
            onError={
              handleImageError
            }
            draggable="false"
            className="
              absolute
              inset-0
              block
              w-full
              h-full
              object-cover
              object-center
              select-none
            "
          />

          {/* ZOOM DESKTOP */}

          <div
            className={`
              absolute
              inset-0
              hidden
              lg:block
              pointer-events-none
              transition-opacity
              duration-200

              ${
                isZooming
                  ? "opacity-100"
                  : "opacity-0"
              }
            `}
            style={{
              backgroundImage: `url("${
                selectedImage ||
                FALLBACK_IMAGE
              }")`,

              backgroundRepeat:
                "no-repeat",

              backgroundSize:
                "220%",

              backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
            }}
          />

          {/* LUPA */}

          <div
            className="
              absolute
              top-4
              right-4
              sm:top-5
              sm:right-5
              z-10
              bg-white/95
              backdrop-blur
              shadow-lg
              rounded-full
              w-11
              h-11
              sm:w-12
              sm:h-12
              flex
              items-center
              justify-center
              pointer-events-none
            "
          >
            <Search
              size={20}
            />
          </div>

          {/* MENSAGEM MOBILE */}

          <div
            className="
              absolute
              bottom-4
              left-1/2
              -translate-x-1/2
              bg-black/75
              text-white
              px-4
              py-2
              rounded-full
              text-xs
              sm:text-sm
              whitespace-nowrap
              pointer-events-none
              lg:hidden
              flex
              items-center
              gap-2
            "
          >
            <ZoomIn size={16} />

            Toque para ampliar
          </div>
        </div>
      </div>

      {/* MODAL */}

      {isModalOpen && (
        <div
          onClick={closeModal}
          className="
            fixed
            inset-0
            z-[100]
            bg-black/95
            flex
            items-center
            justify-center
            overflow-auto
            p-3
            sm:p-6
            md:p-10
          "
        >
          <button
            type="button"
            onClick={closeModal}
            aria-label="Fechar imagem"
            className="
              fixed
              top-4
              right-4
              sm:top-5
              sm:right-5
              z-[110]
              bg-white
              text-black
              w-11
              h-11
              sm:w-12
              sm:h-12
              rounded-full
              flex
              items-center
              justify-center
              hover:scale-110
              duration-300
              shadow-lg
            "
          >
            <X size={24} />
          </button>

          <div
            onClick={(event) =>
              event.stopPropagation()
            }
            className="
              w-full
              h-full
              flex
              items-center
              justify-center
              overflow-auto
            "
          >
            <img
              src={
                selectedImage ||
                FALLBACK_IMAGE
              }
              alt="Produto ampliado"
              onError={
                handleImageError
              }
              onClick={() =>
                setModalZoom(
                  (current) =>
                    !current
                )
              }
              className={`
                block
                object-contain
                transition-all
                duration-300
                select-none

                ${
                  modalZoom
                    ? "max-w-none w-[180%] sm:w-[150%] cursor-zoom-out"
                    : "max-w-full max-h-[90vh] cursor-zoom-in"
                }
              `}
            />
          </div>

          <div
            className="
              fixed
              bottom-5
              left-1/2
              -translate-x-1/2
              bg-white/95
              text-black
              px-4
              py-2
              rounded-full
              text-xs
              sm:text-sm
              shadow-lg
              pointer-events-none
            "
          >
            {modalZoom
              ? "Toque novamente para reduzir"
              : "Toque na foto para dar zoom"}
          </div>
        </div>
      )}
    </>
  );
}