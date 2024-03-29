const parser = require("./parser");
const getRichTextNodes = require("./richtext").getRichTextNodes;

Component({
  properties: {
    md: {
      type: String,
      value: "",
      observer() {
        this.parseMd();
      },
    },
    type: {
      type: String,
      value: "wemark",
    },
    link: {
      type: Boolean,
      value: false,
    },
    highlight: {
      type: Boolean,
      value: false,
    },
    userselect: {
      type: Boolean,
      value: false,
    },
  },
  data: {
    parsedData: {},
    richTextNodes: [],
  },
  methods: {
    parseMd() {
      if (this.data.md) {
        var parsedData = parser.parse(this.data.md, {
          link: this.data.link,
          highlight: this.data.highlight,
        });
        // console.log('parsedData:', parsedData);
        if (this.data.type === "wemark") {
          this.setData(
            {
              parsedData,
            },
            () => {
              this.triggerEvent("renderend");
            }
          );
        } else {
          // var inTable = false;
          var richTextNodes = getRichTextNodes(parsedData);

          // console.log('richTextNodes:', richTextNodes);

          this.setData({
            richTextNodes,
          });

          /* // 分批更新
					var update = {};
					var batchLength = 1000;
					console.log(batchLength);
					for(var i=0; i<richTextNodes.length; i++){
						update['richTextNodes.' + i] = richTextNodes[i];
						if(i%batchLength === batchLength - 1){
							console.log(update);
							this.setData(update);
							update = {};
						}
					}
					this.setData(update);
					update = {}; */
        }
      }
    },
    onTap: function (e) {
      if (
        e &&
        e.target &&
        e.target.dataset &&
        e.target.dataset.url &&
        e.target.dataset.url.startsWith("https://mp.weixin.qq.com")
      ) {
        this.triggerEvent("myevent3", e.target.dataset.url);
      } else {
        this.triggerEvent("myevent", e);
      }
    },
    handleCopy: function (e) {
      this.triggerEvent("myevent2", e);
    },
  },
});
