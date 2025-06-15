import React, { useEffect, useState } from 'react';

const MovieComment = ({movieId}) => {
    const [comments, setComments] = useState([]);
    const [loadingComments, setLoadingComments] = useState(true);
    const [commentError, setCommentError] = useState(null);

    useEffect(() => {
        const fetchComments = async () => {
            setLoadingComments(true);
            setCommentError(null);

            try {
                const response = await fetch(`/api/comment/${movieId}`);

                if (!response.ok) {
                    if (response.status === 401 || response.status === 403) {
                        throw new Error("댓글을 조회할 권한이 없습니다. 로그인해주세요.");
                    }
                    throw new Error(`댓글을 불러오는 중 오류 발생: ${response.status} ${response.statusText}`);
                }
                const data = await response.json();
                setComments(data);
            } catch (err) {
                console.error("댓글을 불러오는 중 오류 발생:", err);
                setCommentError(err.message);
                setComments([]);
            } finally {
                setLoadingComments(false);
            }
        };
        
        if (movieId) {
            fetchComments();
        } else {
            setLoadingComments(false);
            setComments([]);
        }
    }, [movieId]);

    if (loadingComments) {
        return <p>댓글 로딩 중...</p>;
    }

    if (commentError) {
        return <p className="text-danger">댓글을 불러오지 못했습니다: {commentError}</p>;
    }

    return (
        <div className="card p-4">
            <h3 className="mb-4">댓글</h3>
            {comments && comments.length > 0 ? (
                comments.map((comment, idx) => (
                    <div key={idx} className="mb-3 border-bottom pb-2">
                        <p className="fw-bold">{comment.author || "익명"}</p>
                        <p>{comment.content || comment.text || "내용 없음"}</p>
                        <small className="text-muted">{comment.date || comment.createdAt || ""}</small>
                    </div>
                ))
            ) : (
                <p>댓글이 없습니다.</p>
            )}
        </div>
    );
};

export default MovieComment;