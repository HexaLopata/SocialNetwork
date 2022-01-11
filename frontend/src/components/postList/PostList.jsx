import Post from '../post/Post'
import classes from './PostList.module.css'

function PostList({posts}) {
    return (  
        <div>
            { posts.map(p => 
                <Post key={p.id} {...p}/>
            )}
        </div>
    );
}

export default PostList;