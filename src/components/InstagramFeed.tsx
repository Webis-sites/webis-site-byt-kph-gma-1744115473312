'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaInstagram, FaHeart, FaComment, FaArrowRight } from 'react-icons/fa';

interface InstagramPost {
  id: string;
  imageUrl: string;
  caption: string;
  likes: number;
  comments: number;
  permalink: string;
}

interface InstagramFeedProps {
  username: string;
  profileUrl: string;
  postsCount?: number;
}

const InstagramFeed: React.FC<InstagramFeedProps> = ({
  username = 'בית_קפה_גמא',
  profileUrl = 'https://www.instagram.com/cafe_gamma/',
  postsCount = 6,
}) => {
  const [posts, setPosts] = useState<InstagramPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Simulated Instagram posts data (in a real app, you would fetch this from Instagram API)
  useEffect(() => {
    // Simulating API fetch delay
    const timer = setTimeout(() => {
      const dummyPosts: InstagramPost[] = [
        {
          id: '1',
          imageUrl: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93',
          caption: 'קפה בוקר מושלם בבית קפה גמא',
          likes: 124,
          comments: 23,
          permalink: 'https://www.instagram.com/p/sample1/',
        },
        {
          id: '2',
          imageUrl: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085',
          caption: 'עוגת השבוע שלנו - שוקולד פיסטוק',
          likes: 98,
          comments: 12,
          permalink: 'https://www.instagram.com/p/sample2/',
        },
        {
          id: '3',
          imageUrl: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24',
          caption: 'קרואסון חמאה טרי מהתנור',
          likes: 156,
          comments: 18,
          permalink: 'https://www.instagram.com/p/sample3/',
        },
        {
          id: '4',
          imageUrl: 'https://images.unsplash.com/photo-1513267048331-5611cad62e41',
          caption: 'לאטה ארט מיוחד',
          likes: 201,
          comments: 32,
          permalink: 'https://www.instagram.com/p/sample4/',
        },
        {
          id: '5',
          imageUrl: 'https://images.unsplash.com/photo-1556742393-d75f468bfcb0',
          caption: 'סלט בריאות של הבוקר',
          likes: 87,
          comments: 9,
          permalink: 'https://www.instagram.com/p/sample5/',
        },
        {
          id: '6',
          imageUrl: 'https://images.unsplash.com/photo-1572286258217-215b98b27b99',
          caption: 'אווירה מושלמת לעבודה מרחוק',
          likes: 112,
          comments: 15,
          permalink: 'https://www.instagram.com/p/sample6/',
        },
        {
          id: '7',
          imageUrl: 'https://images.unsplash.com/photo-1534080564583-6be75777b70a',
          caption: 'קפה קר מיוחד לקיץ',
          likes: 178,
          comments: 27,
          permalink: 'https://www.instagram.com/p/sample7/',
        },
        {
          id: '8',
          imageUrl: 'https://images.unsplash.com/photo-1579888944880-d98341245702',
          caption: 'מאפים טריים כל בוקר',
          likes: 143,
          comments: 19,
          permalink: 'https://www.instagram.com/p/sample8/',
        },
      ];

      setPosts(dummyPosts.slice(0, postsCount));
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, [postsCount]);

  // Grid layout responsiveness configuration
  const getGridCols = () => {
    return {
      'grid-cols-1': true,
      'sm:grid-cols-2': true,
      'md:grid-cols-3': true,
    };
  };

  return (
    <div className="instagram-feed-container w-full px-4 py-8 bg-gradient-to-br from-primary/10 to-secondary/10 backdrop-blur-sm rounded-3xl shadow-neumorph rtl">
      <div className="glass-card p-6 rounded-2xl backdrop-blur-md bg-white/30 border border-white/20 shadow-glass">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <div className="w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-br from-primary to-secondary shadow-neumorph-inset">
              <FaInstagram className="text-white text-xl" />
            </div>
            <div className="mr-4 ml-4 rtl:mr-4 rtl:ml-0">
              <h3 className="text-2xl font-bold text-gray-800">@{username}</h3>
              <p className="text-gray-600">בית קפה גמא באינסטגרם</p>
            </div>
          </div>
          <motion.a
            href={profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="follow-button px-5 py-2 rounded-full bg-gradient-to-r from-primary to-secondary text-white font-medium flex items-center shadow-neumorph-sm hover:shadow-neumorph-sm-hover active:shadow-neumorph-sm-active transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="ml-2">עקבו אחרינו</span>
            <FaArrowRight className="rtl:rotate-180" />
          </motion.a>
        </div>

        <AnimatePresence>
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <motion.div
                className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={`grid gap-4 ${Object.entries(getGridCols())
                .filter(([_, value]) => value)
                .map(([key]) => key)
                .join(' ')}`}
            >
              {posts.map((post, index) => (
                <motion.div
                  key={post.id}
                  className="instagram-post-card relative overflow-hidden rounded-xl shadow-neumorph-sm group"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <a href={post.permalink} target="_blank" rel="noopener noreferrer">
                    <div className="aspect-square overflow-hidden">
                      <img
                        src={post.imageUrl}
                        alt={post.caption}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                      <p className="text-white text-sm mb-2 line-clamp-2 rtl:text-right">{post.caption}</p>
                      <div className="flex items-center space-x-4 rtl:space-x-reverse">
                        <div className="flex items-center">
                          <FaHeart className="text-white mr-1 rtl:ml-1 rtl:mr-0" />
                          <span className="text-white text-sm">{post.likes}</span>
                        </div>
                        <div className="flex items-center">
                          <FaComment className="text-white mr-1 rtl:ml-1 rtl:mr-0" />
                          <span className="text-white text-sm">{post.comments}</span>
                        </div>
                      </div>
                    </div>
                  </a>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default InstagramFeed;