const BASE_URL = 'http://192.168.100.133:3000/api/forum';

export async function getForumsApi( token: string, courseIds: number[]) {
    const params = courseIds.map(id => `courseIds=${id}`).join('&');

    const response = await fetch(`${BASE_URL}/forums?${params}`,{
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    if (!response.ok) {
        throw new Error('Error backend');
    }

    return await response.json();
}

export async function getForumDiscussionsApi(forumId: number, token: string ) {
    const response = await fetch(`${BASE_URL}/forums/${forumId}/discussions`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    if (!response.ok) {
        throw new Error('Error backend');
    }

    return await response.json();
}

export async function getDiscussionPostsApi( discussionId: number, token: string) {
    const response = await fetch(`${BASE_URL}/discussions/${discussionId}/posts`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    if (!response.ok) {
        throw new Error('Error backend');
    }

    return await response.json();
}