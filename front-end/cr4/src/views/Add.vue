<template>
<div class='admin'>
  <h1>Upload or Edit a Meme</h1>
  <div class="heading">
    <h2>Add an Meme</h2>
  </div>
  <div class="add">
    <div class="form">
      <input class="Titletext" v-model="title" placeholder="Uploader Username">
      <p></p>
      <input type="file" name="photo" @change="fileChanged">
      <button @click="upload">Upload</button>
    </div>
    <div class="upload" v-if="addMeme">
      <h2>{{addMeme.title}}</h2>
      <img :src="addMeme.path" />
    </div>
  </div>
  <div class="heading">
    <h2>Edit/Delete an Meme</h2>
  </div>
  <div class="edit">
    <div class="form">
      <input class="Titletext" v-model="findTitle" placeholder="Search by Uploader">
      <div class="suggestions" v-if="suggestions.length > 0">
        <div class="suggestion" v-for="s in suggestions" :key="s.id" @click="selectMeme(s)">{{s.title}}
        </div>
      </div>
    </div>
    <div class="upload" v-if="findMeme">
      <input class="Titletext" v-model="findMeme.title">
      <p></p>
      <img :src="findMeme.path" />
    </div>
    <div class="actions" v-if="findMeme">
      <button @click="deleteMeme(findMeme)">Delete</button>
      <button @click="editMeme(findMeme)">Edit</button>
    </div>
  </div>
</div>
</template>

<style scoped>
.image h2 {
  font-style: italic;
  font-size: 1em;
}

.heading {
  display: flex;
  margin-bottom: 20px;
  margin-top: 20px;
}

.heading h2 {
  margin-top: 8px;
  margin-left: 10px;
}

.add,
.edit {
  display: flex;
  justify-content: center;
  border-radius: 30px;
  background: #4a4a4a;
  padding: 20px;
}

/* Form */
input,
textarea,
select,
button {
  font-family: 'Montserrat', sans-serif;
  font-size: 1em;
  //background: #4a4a4a;
}

.Titletext,
textarea,
button {
  background: #4a4a4a;
}

.form {
  margin-right: 50px;
}

/* Uploaded images */
.upload h2 {
  margin: 0px;
}

.upload img {
  max-width: 300px;
}

/* Suggestions */
.suggestions {
  width: 200px;
  border: 1px solid #ccc;
}

.suggestion {
  min-height: 20px;
}

.suggestion:hover {
  background-color: #5BDEFF;
  color: #fff;
}
</style>

<script>
import axios from 'axios';
export default {
  name: 'Admin',
  data() {
    return {
      title: "",
      likes: 0,
      dislikes: 0,
      file: null,
      addMeme: null,
      memes: [],
      findTitle: "",
      findMeme: null,
    }
  },
  computed: {
    suggestions() {
      let memes = this.memes.filter(meme => meme.title.toLowerCase().startsWith(this.findTitle.toLowerCase()));
      return memes.sort((a, b) => a.title > b.title);
    }
  },
  created() {
    this.getMemes();
  },
  methods: {
    fileChanged(event) {
      this.file = event.target.files[0]
    },
    async upload() {
      try {
        const formData = new FormData();
        formData.append('photo', this.file, this.file.name)
        let r1 = await axios.post('/api/photos', formData);
        let r2 = await axios.post('/api/memes', {
          title: this.title,
          likes: 0,
          dislikes: 0,
          path: r1.data.path
        });
        this.addMeme = r2.data;
      } catch (error) {
        console.log(error);
      }
    },
    async getMemes() {
      try {
        let response = await axios.get("/api/memes");
        this.memes = response.data;
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    selectMeme(meme) {
      this.findTitle = "";
      this.findMeme = meme;
    },
    async deleteMeme(meme) {
      try {
        await axios.delete("/api/memes/" + meme._id);
        this.findMeme = null;
        this.getMemes();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async editMeme(meme) {
      try {
        await axios.put("/api/memes/" + meme._id, {
          title: this.findMeme.title,
          likes: this.findMeme.likes,
          dislikes: this.findMeme.dislikes
        });
        this.findMeme = null;
        this.getMemes();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
  },
}
</script>
