<template>
<div class="home">
  <section class="image-gallery">
    <div class="image" v-for="meme in memes" :key="meme.id">
      <h2>Uploaded by: {{meme.title}}</h2>
      <img :src="meme.path" />
      <div class="likecounters">
        <div class="likes">
          <img @click="addLike(meme)" src="/IFunny_logo.png">
          <h3>{{meme.likes}}</h3>
        </div>
        <div class="dislikes">
          <img @click="addDislike(meme)" src="/dislike.png">
          <h3>{{meme.dislikes}}</h3>
        </div>
      </div>
    </div>
  </section>
</div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios';
export default {
  name: 'Home',
  data() {
    return {
      likes: 0,
      dislikes: 0,
      memes: [],
    }
  },
  created() {
    this.getMemes();
  },
  methods: {
    async getMemes() {
      try {
        let response = await axios.get("/api/memes");
        this.memes = response.data;
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async addDislike(meme) {
      try {
        await axios.put("/api/memes/" + meme._id, {
          dislikes: meme.dislikes + 1,
          title: meme.title,
          likes: meme.likes
        });
        this.getMemes();
      } catch (error) {
        console.log(error);
      }
    },
    async addLike(meme) {
      try {
        await axios.put("/api/memes/" + meme._id, {
          likes: meme.likes + 1,
          title: meme.title,
          dislikes: meme.dislikes
        });
        this.getMemes();
      } catch (error) {
        console.log(error);
      }
    },
  }
}
</script>

<style scoped>
.image h2 {
  font-style: italic;
}

/* Masonry */
*,
*:before,
*:after {
  box-sizing: inherit;
}

.image-gallery {
  column-gap: 1.5em;
}

.image {
  margin: 0 0 1.5em;
  display: inline-block;
  width: 100%;
}

.image img {
  width: 100%;
}

.likes img {
  height: 30px;
  width: auto;
}

.dislikes img {
  height: 37px;
  width: auto;
}

.likes,
.dislikes {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-display: center;
  align-self: center;
  align-content: center;
}

.likecounters {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  flex-display: center;
  align-self: center;
  align-content: center;
}

/* Masonry on large screens */
@media only screen and (min-width: 1024px) {
  .image-gallery {
    column-count: 4;
  }
}

/* Masonry on medium-sized screens */
@media only screen and (max-width: 1023px) and (min-width: 768px) {
  .image-gallery {
    column-count: 3;
  }
}

/* Masonry on small screens */
@media only screen and (max-width: 767px) and (min-width: 540px) {
  .image-gallery {
    column-count: 2;
  }
}
</style>
