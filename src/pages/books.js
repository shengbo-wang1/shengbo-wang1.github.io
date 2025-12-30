import React from 'react';
import Layout from '@theme/Layout';

// 书单数据
const Books = [
    {
        title: '深入理解计算机系统',
        author: 'Randal E. Bryant',
        rating: '★★★★★',
        cover: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', // 也可以换成真实的封面图链接
        comment: '程序员的必读经典，虽然很厚，但读完内功大增。'
    },
    {
        title: '三体',
        author: '刘慈欣',
        rating: '★★★★★',
        cover: 'https://images.unsplash.com/photo-1629196911514-cfd8d628b26e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        comment: '给岁月以文明，而不是给文明以岁月。'
    },
    {
        title: '活着',
        author: '余华',
        rating: '★★★★☆',
        cover: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        comment: '人是为了活着本身而活着的，而不是为了活着之外的任何事物所活着。'
    },
    {
        title: '黑客与画家',
        author: 'Paul Graham',
        rating: '★★★★☆',
        cover: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        comment: '创业、编程与艺术的交织。'
    }
];

export default function BookList() {
    return (
        <Layout title="书单" description="王老六的阅读清单">
            <div className="container margin-vert--lg">
                <div className="text--center margin-bottom--lg">
                    <h1>📚 阅读 / Reading</h1>
                    <p>输入，为了更好的输出。</p>
                </div>

                <div className="book-container">
                    {Books.map((book, idx) => (
                        <div key={idx} className="book-card">
                            <div className="book-cover">
                                <img src={book.cover} alt={book.title} />
                            </div>
                            <div className="book-info">
                                <div>
                                    <div className="book-title">{book.title}</div>
                                    <div className="book-author">{book.author}</div>
                                    <div className="book-rating">{book.rating}</div>
                                </div>
                                <div className="book-comment">“ {book.comment} ”</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    );
}
