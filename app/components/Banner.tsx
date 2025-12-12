"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

type BannerType = "image" | "carousel" | "video" | "gradient";

interface BannerItem {
  id: number;
  title?: string;
  description?: string;
  image?: string;
  video?: string;
  color?: string;
  buttonText?: string;
  buttonLink?: string;
}

interface BannerProps {
  type?: BannerType;
  items?: BannerItem[];
  height?: string;
  autoPlay?: boolean;
  interval?: number;
  showScrollingText?: boolean;
  scrollingTexts?: string[];
}

export default function Banner({
  type = "image",
  items = defaultItems,
  height = "100vh",
  autoPlay = true,
  interval = 3000,
  showScrollingText = true,
  scrollingTexts = [
    "Empowering Communities",
    "Creating Lasting Change",
    "Building a Better Future",
    "Uniting for Progress",
  ],
}: BannerProps) {
  const [isClient, setIsClient] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const scrollingTextRef = useRef<HTMLDivElement>(null);

  // 只在客户端设置 isClient
  useEffect(() => {
    setIsClient(true);
  }, []);

  // 自动轮播效果 - 只在客户端运行
  useEffect(() => {
    if (!isClient || !autoPlay || type !== "carousel" || items.length <= 1) return;

    const carouselInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % items.length);
    }, interval);

    return () => clearInterval(carouselInterval);
  }, [isClient, autoPlay, type, items.length, interval]);

  // 文字滚动效果 - 只在客户端运行
  useEffect(() => {
    if (!isClient || !showScrollingText || !scrollingTextRef.current) return;

    const scrollingText = scrollingTextRef.current;

    const scrollText = () => {
      if (scrollingText.scrollWidth > scrollingText.clientWidth) {
        if (
          scrollingText.scrollLeft >=
          scrollingText.scrollWidth - scrollingText.clientWidth
        ) {
          scrollingText.scrollLeft = 0;
        } else {
          scrollingText.scrollLeft += 1;
        }
      }
    };

    const textInterval = setInterval(scrollText, 30);
    return () => clearInterval(textInterval);
  }, [isClient, showScrollingText]);

  // 服务器端渲染时使用固定的 currentSlide
  const displaySlide = isClient ? currentSlide : 0;

  const renderContent = () => {
    switch (type) {
      case "carousel":
        return (
          <div className="relative w-full h-full">
            {items.map((item, index) => (
              <div
                key={item.id}
                className={`absolute inset-0 transition-opacity duration-1000 ${
                  index === displaySlide ? "opacity-100" : "opacity-0"
                }`}
                // 服务器端隐藏非活动项
                style={!isClient && index !== displaySlide ? { display: 'none' } : undefined}
              >
                {/* 图片渲染 - 服务器端使用简单的 div */}
                {item.image ? (
                  isClient ? (
                    <div className="absolute inset-0">
                      <Image
                        src={item.image}
                        alt={item.title || "Banner image"}
                        fill
                        className="object-cover"
                        priority
                      />
                      <div className="absolute inset-0 bg-black/40"></div>
                    </div>
                  ) : (
                    // 服务器端渲染占位符
                    <div className="absolute inset-0 bg-black/40"></div>
                  )
                ) : item.color ? (
                  <div
                    className="absolute inset-0"
                    style={{ backgroundColor: item.color }}
                  />
                ) : null}
                
                <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
                  <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 md:mb-6">
                    {item.title}
                  </h1>
                  <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
                    {item.description}
                  </p>
                  {item.buttonText && item.buttonLink && (
                    <Link
                      href={item.buttonLink}
                      className="
                        px-8 py-3 md:px-10 md:py-4
                        bg-blue-700 text-white font-semibold text-lg
                        rounded-md shadow-md
                        transition-all duration-400 ease-out
                        hover:bg-blue-800 hover:shadow-lg hover:-translate-y-1
                        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                      "
                    >
                      {item.buttonText}
                    </Link>
                  )}
                </div>
              </div>
            ))}

            {/* 轮播指示器 - 只在客户端显示 */}
            {isClient && items.length > 1 && (
              <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {items.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === displaySlide
                        ? "bg-white w-8"
                        : "bg-white/50 hover:bg-white/80"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        );

      case "video":
        // 服务器端不渲染 video，使用占位图
        if (!isClient) {
          return (
            <div className="relative w-full h-full bg-gray-900">
              <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 md:mb-6">
                  {items[0]?.title}
                </h1>
                <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
                  {items[0]?.description}
                </p>
              </div>
            </div>
          );
        }

        return (
          <div className="relative w-full h-full">
            {items[0]?.video && (
              <video
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
              >
                <source src={items[0].video} type="video/mp4" />
              </video>
            )}
            <div className="absolute inset-0 bg-black/50"></div>
            <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 md:mb-6">
                {items[0]?.title}
              </h1>
              <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
                {items[0]?.description}
              </p>
              {items[0]?.buttonText && items[0]?.buttonLink && (
                <Link
                  href={items[0].buttonLink}
                  className="px-8 py-3 md:px-10 md:py-4 bg-white text-gray-900 text-lg font-semibold rounded-lg hover:bg-gray-100 transition duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl"
                >
                  {items[0].buttonText}
                </Link>
              )}
            </div>
          </div>
        );

      // ... 其他 case 保持类似修改

      default: // image
        return (
          <div className="relative w-full h-full">
            {items[0]?.image ? (
              isClient ? (
                <div className="absolute inset-0">
                  <Image
                    src={items[0].image}
                    alt={items[0].title || "Banner image"}
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-black/40"></div>
                </div>
              ) : (
                // 服务器端渲染占位符
                <div className="absolute inset-0 bg-black/40"></div>
              )
            ) : null}
            
            <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 sm:px-6 lg:px-8">
              <h1
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-snug 
               max-w-full sm:max-w-2xl md:max-w-3xl lg:max-w-4xl"
                suppressHydrationWarning // 添加这个属性
              >
                {items[0]?.title}
              </h1>

              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 mb-8 max-w-full sm:max-w-2xl md:max-w-3xl lg:max-w-4xl leading-relaxed">
                {items[0]?.description}
              </p>

              {items[0]?.buttonText && items[0]?.buttonLink && (
                <Link
                  href={items[0].buttonLink}
                  className="px-6 sm:px-8 md:px-10 py-3 sm:py-4 bg-white text-gray-900 text-base sm:text-lg md:text-xl 
                 font-semibold rounded-lg shadow-lg hover:shadow-xl hover:-translate-y-1 transition-transform duration-300"
                  suppressHydrationWarning // 添加这个属性
                >
                  {items[0].buttonText}
                </Link>
              )}
            </div>
          </div>
        );
    }
  };

  return (
    <section
      className="relative flex items-center justify-center overflow-hidden"
      style={{ height }}
      suppressHydrationWarning // 为整个 section 添加
    >
      {renderContent()}

      {/* 底部滚动文字栏 - 只在客户端显示 */}
      {isClient && showScrollingText && scrollingTexts.length > 0 && (
        <div className="absolute bottom-0 left-0 right-0 bg-white/90 backdrop-blur-sm border-t border-gray-200">
          <div className="container mx-auto px-4 py-3 sm:py-4">
            <div className="flex items-center space-x-4 overflow-hidden">
              <div className="w-3 h-3 bg-blue-600 rounded-full animate-pulse flex-shrink-0"></div>

              <span className="text-sm sm:text-base md:text-lg font-semibold text-gray-900 flex-shrink-0">
                Live Updates:
              </span>

              <div className="flex-1 overflow-hidden">
                <div
                  ref={scrollingTextRef}
                  className="flex whitespace-nowrap space-x-6"
                >
                  {scrollingTexts.map((text, index) => (
                    <span
                      key={index}
                      className="text-sm sm:text-base md:text-lg text-gray-700 font-medium flex-shrink-0"
                    >
                      {text}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 将 style jsx 移到单独的 CSS 文件或使用 Tailwind */}
        </div>
      )}
    </section>
  );
}

// 默认数据
const defaultItems: BannerItem[] = [
  {
    id: 1,
    title: "Welcome to Our Organization",
    description:
      "We are dedicated to making a difference in our community and beyond. Join us in creating positive change through collective action.",
    buttonText: "Take Action Now",
    buttonLink: "/action-center",
    color: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  },
];