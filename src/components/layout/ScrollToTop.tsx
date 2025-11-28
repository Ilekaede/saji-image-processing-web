import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * ページ遷移時に常にトップにスクロールするコンポーネント
 * 
 * React RouterのuseLocationフックを使用してルート変更を検知し、
 * ページ遷移時に自動的にスクロール位置をトップにリセットします。
 */
const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
};

export default ScrollToTop;
