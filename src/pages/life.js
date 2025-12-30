import React, { useState, useEffect, useRef } from 'react';
import Layout from '@theme/Layout';
import clsx from 'clsx';
import styles from '../css/life.module.css';
import lifeData from '../data/lifeData.json';

// --- FadeInSection (保持不变) ---
const FadeInSection = ({ children }) => {
    const [isVisible, setIsVisible] = useState(false);
    const domRef = useRef();
    useEffect(() => {
        const observer = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) setIsVisible(true);
        }, { threshold: 0.1 });
        const current = domRef.current;
        if (current) observer.observe(current);
        return () => { if (current) observer.unobserve(current); };
    }, []);
    return (
        <div ref={domRef} className={clsx(styles.scrollHidden, isVisible && styles.scrollVisible)}>
            {children}
        </div>
    );
};

// --- PhotoCard (保持不变) ---
const PhotoCard = ({ item, onClick }) => (
    <div className={styles.photoItem} onClick={() => onClick(item)}>
        <img src={item.src} alt={item.title} className={styles.photoImg} loading="lazy" />
        <div className={styles.overlay}>
            <h3 className={styles.photoTitle}>{item.title}</h3>
            <p className={styles.photoDesc}>{item.desc}</p>
        </div>
    </div>
);

export default function Life() {
    const [selectedPhoto, setSelectedPhoto] = useState(null);
    const wrapperRef = useRef(null);

    // 🔥 核武器修复：使用 require 强行引入图片
    // 只要这一行不报错，图片就绝对能加载出来！
    let heroBgUrl;
    try {
        heroBgUrl = require('@site/static/img/life/wedding-cover.jpg').default;
    } catch (e) {
        // 如果文件名不对，控制台会打印这个错误
        console.error("❌ 找不到封面图！请检查 static/img/life/ 下有没有 wedding-cover.jpg", e);
        // 兜底图，防止白屏
        heroBgUrl = "https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80";
    }

    // --- 极速性能优化版 Scroll Effect (泛白效果) ---
    useEffect(() => {
        let ticking = false;

        const updateParallax = () => {
            if (!wrapperRef.current) return;

            const scrollY = window.scrollY;
            const windowHeight = window.innerHeight;
            // 滚动 60% 屏幕高度时，背景完全变白
            const threshold = windowHeight * 0.6;

            let progress = scrollY / threshold;
            if (progress > 1) progress = 1;
            if (progress < 0) progress = 0;

            // 透明度：1 -> 0 (不卡顿方案)
            const targetOpacity = 1 - progress;
            wrapperRef.current.style.setProperty('--hero-opacity', targetOpacity);

            ticking = false;
        };

        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(updateParallax);
                ticking = true;
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        updateParallax();

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <Layout title="Life" description="王老六的生活切片">
            <div className={styles.lifeWrapper} ref={wrapperRef}>

                {/* 🔥 关键：用 style 设置背景图，路径由 JS 计算 */}
                <div
                    className={styles.heroBackground}
                    style={{ backgroundImage: `url(${heroBgUrl})` }}
                ></div>

                {/* 封面文字 */}
                <section className={styles.heroSection}>
                    <div className={styles.heroOverlay}></div>
                    <div className={styles.heroContent}>
                        <h1 className={styles.heroTitle}>LIFE LOG</h1>
                        <p className={styles.heroSubtitle}>LOVE & SUNSHINE</p>
                    </div>
                    <div className={styles.scrollMouse}><div className={styles.scrollWheel}></div></div>
                </section>

                {/* 内容容器 */}
                <div className={styles.lifeContainer}>
                    {lifeData.map((eventItem, index) => (
                        <div key={index} className={styles.eventGroup}>
                            <div className={styles.dateColumn}>
                                <div className={styles.stickyDate}>
                                    <div className={styles.dateYear}>{eventItem.date}</div>
                                    <div className={styles.dateEvent}>{eventItem.event}</div>
                                    <div className={styles.dateDesc}>{eventItem.description}</div>
                                </div>
                                <div className={styles.timelineNode}></div>
                            </div>

                            <div className={styles.blocksWrapper}>
                                {eventItem.blocks.map((block, blockIndex) => {
                                    const layoutClass = styles[`layout-${block.layout}`];
                                    return (
                                        <FadeInSection key={blockIndex}>
                                            <div className={clsx(styles.photoRow, styles.photosContainer, layoutClass)}>
                                                {block.items.map((item, itemIndex) => (
                                                    <PhotoCard
                                                        key={itemIndex}
                                                        item={item}
                                                        onClick={setSelectedPhoto}
                                                    />
                                                ))}
                                            </div>
                                        </FadeInSection>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Lightbox */}
                {selectedPhoto && (
                    <div className={styles.lightbox} onClick={() => setSelectedPhoto(null)}>
                        <img src={selectedPhoto.src} alt={selectedPhoto.title} className={styles.lightboxImg} onClick={(e) => e.stopPropagation()} />
                    </div>
                )}
            </div>
        </Layout>
    );
}
