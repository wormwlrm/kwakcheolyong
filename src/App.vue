<template>
  <div id="app">
    <el-container>
      <el-header>
        <h2 class="kwakchelyong__title">곽철용 짤 생성기</h2>
      </el-header>
      <el-main>
        <el-form label-width="120px">
          <el-select
            :value="imageIndex"
            @input="onImageChanged($event)"
            class="kwakchelyong__image-selector"
          >
            <el-option v-for="img in getImages" :value="img.id" :key="img.id" :label="img.name" />
          </el-select>
          <el-card shadow="none" class="kwakchelyong__canvas-wrapper">
            <canvas id="canvas" ref="canvas" :width="1000" :height="427">
              이 브라우저는 HTML5의 canvas 요소를 지원하지 않습니다
            </canvas>
          </el-card>
          <el-form-item label="원본 대사">
            <blockquote v-html="getImages[imageIndex].original"></blockquote>
          </el-form-item>
          <el-form-item label="텍스트">
            <el-input
              type="textarea"
              :value="option.text"
              @input="onValueChanged('text', $event)"
              :placeholder="getImages[imageIndex].placeholder"
            />
          </el-form-item>
          <el-row>
            <el-col :xs="24" :sm="12" :md="8">
              <el-form-item label="폰트 종류">
                <el-select :value="option.fontFamily" @input="onValueChanged('fontFamily', $event)">
                  <el-option value="Nanum Gothic">Nanum Gothic</el-option>
                  <el-option value="Gulim">Gulim</el-option>
                  <el-option value="Arial">Arial</el-option>
                  <el-option value="Helvetica">Helvetica</el-option>
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :xs="24" :sm="12" :md="8">
              <el-form-item label="폰트 사이즈">
                <el-select :value="option.fontSize" @input="onValueChanged('fontSize', $event)">
                  <el-option :value="15">15</el-option>
                  <el-option :value="20">20</el-option>
                  <el-option :value="25">25</el-option>
                  <el-option :value="30">30</el-option>
                  <el-option :value="35">35</el-option>
                  <el-option :value="40">40</el-option>
                  <el-option :value="45">45</el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :md="8">
              <el-form-item label="폰트 색상">
                <el-color-picker
                  :value="option.fontColor"
                  @input="onValueChanged('fontColor', $event)"
                />
              </el-form-item>
            </el-col>

            <el-col :xs="24" :sm="12" :md="8">
              <el-form-item label="폰트 두께">
                <el-select :value="option.fontWeight" @input="onValueChanged('fontWeight', $event)">
                  <el-option value="lighter" label="얇게"></el-option>
                  <el-option value="normal" label="보통">보통</el-option>
                  <el-option value="bolder" label="두껍게">두껍게</el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :md="8">
              <el-form-item label="폰트 테두리">
                <el-select :value="option.textBorder" @input="onValueChanged('textBorder', $event)">
                  <el-option value="transparent" label="없음"></el-option>
                  <el-option value="black" label="검정색"></el-option>
                  <el-option value="white" label="흰색"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>

          <el-form-item label>
            <el-button @click="downloadCanvas" id="download">다운로드</el-button>
          </el-form-item>
        </el-form>
      </el-main>
      <el-alert
        :title="
          `
          웹뷰(페이스북 앱 등)에서는 다운로드 버튼이 작동하지 않습니다.
          다른 브라우저를 이용하면 정상적으로 이용하실 수 있습니다.
          `
        "
        type="info"
        effect="dark"
      ></el-alert>
      <Adsense data-ad-client="ca-pub-8996192158520412" data-ad-slot="5328204023"></Adsense>

      <el-footer>
        <p>
          Created by
          <el-link
            type="primary"
            :underline="false"
            target="_blank"
            href="https://wormwlrm.github.io"
          >
            재그지그 </el-link
          >,
          <el-link
            type="primary"
            :underline="false"
            target="_blank"
            href="mailto:wormwlrm@naver.com"
          >
            이슈 / 버그 제보
          </el-link>
        </p>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import images from '@/images';

export default {
  name: 'app',

  data() {
    return {
      imageIndex: 0,
      option: {
        fontFamily: 'Nanum Gothic',
        fontSize: 30,
        fontColor: '#FFFFFF',
        fontWeight: 'normal',
        text: '',
        textBorder: 'black',
      },
    };
  },

  computed: {
    getImages() {
      return images;
    },
  },

  methods: {
    onValueChanged(key, value) {
      this.option[key] = value;
      this.updateCanvas();
    },

    onImageChanged(value) {
      this.imageIndex = value;
      this.updateCanvas();
    },

    updateCanvas() {
      if (!this.$refs.canvas) return;

      this.updateCanvasImage();
    },

    downloadCanvas() {
      const url = this.$refs.canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${this.getImages[this.imageIndex].name}.png`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },

    updateCanvasImage() {
      const { canvas } = this.$refs;
      const ctx = canvas.getContext('2d');
      const img = new Image();
      img.src = this.getImages[this.imageIndex].src;
      img.onload = () => {
        ctx.drawImage(img, 0, 0);
        this.updateCanvasText();
      };
    },

    updateCanvasText() {
      const { canvas } = this.$refs;

      const { text, fontFamily, fontSize, fontColor, fontWeight, textBorder } = this.option;

      const ctx = canvas.getContext('2d');

      ctx.textAlign = 'center'; // 가로 가운데 정렬
      ctx.textBaseline = 'middle'; // 세로 가운데 정렬
      ctx.font = `${fontWeight} ${fontSize}px ${fontFamily}`;

      const lines = text.split('\n');

      lines.forEach((line, index) => {
        // ctx.shadowColor = 'black';
        // ctx.shadowBlur = 10;
        ctx.lineWidth = 5;
        ctx.strokeStyle = `${textBorder}`;
        ctx.strokeText(
          line,
          canvas.width / 2,
          canvas.height - fontSize * (lines.length - index) * 1.5,
        );

        ctx.fillStyle = fontColor;
        ctx.fillText(
          line,
          canvas.width / 2,
          canvas.height - fontSize * (lines.length - index) * 1.5,
        );
      });
    },
  },

  mounted() {
    this.$nextTick(() => {
      this.updateCanvas();
    });
  },
};
</script>

<style lang="scss">
@import '@/style/variable.scss';
@import url('https://fonts.googleapis.com/css?family=Nanum+Gothic&display=swap');

html,
body {
  margin: 0;
  padding: 0;
  background-color: $gray-900;
}

#app {
  position: relative;
  height: 100vh;
  width: 100vw;
  padding: 20px;
  box-sizing: border-box;

  .kwakchelyong {
    &__title {
      text-align: center;
    }

    &__image-selector {
      width: 250px;
      left: 50%;
      transform: translateX(-50%);
    }

    &__canvas-wrapper {
      width: 100%;
      max-width: 1040px;
      margin: 20px auto;
    }
  }

  #canvas {
    display: block;
    width: 100%;
    max-width: 1000px;
    border: 1px solid $black;
  }

  blockquote {
    border: 1px solid $gray-900;
    border-radius: 4px;
    background: $gray-800;
    border-left: 10px solid $gray-700;
    margin: 10px 0;
    padding: 0.5em 10px;
    color: $gray-200;
  }
}
</style>
