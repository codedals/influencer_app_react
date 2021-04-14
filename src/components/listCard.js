/*global chrome*/
/* src/content.js */
import React from 'react';
import "./css/listCard.css";
import "antd/dist/antd.css";
import { Card, Row, Col, Layout, Menu, Icon } from 'antd';
import {observer} from 'mobx-react';
const { Meta } = Card;
const SubMenu = Menu.SubMenu;

@observer
class ListCard extends React.Component {

    constructor(props){
        super(props);
        //this is bad practice
        this.textHashtags = this.props.listItems;
        //this.textHashtags = this.props.profile.attributes['Hashtags'];
    }

    handleClick(event){
        window.scrollTo(0,0);
        var old_div = document.getElementById("title-div");
        if (old_div != null){
            old_div.remove();
        }

        var generated_divs = document.getElementsByClassName("ir-row");
        if (generated_divs.length > 0){
            for(let div of generated_divs){
                div.remove();
            }
        }

        var a_tags = document.getElementsByClassName("v1Nh3");

        for (let tag of a_tags) {
            tag.style.display = "";
        }

        //var _hashtags = this.textHashtags;
        var target_hashtag = null;
        var keyword = event.target.innerText;
        var target_div = document.getElementsByClassName("fx7hk")[0]
        var title_div =  document.createElement("div");
        title_div.id = "title-div";

        this.props.listItems.forEach(hashtag =>{
            if (hashtag['Keyword'] == keyword){
                target_hashtag = hashtag;
            }
        })

        if(target_hashtag != null){
            var posts_length = target_hashtag['Posts'].length
            if (posts_length > 0){
                var link = "https://instagram.com/explore/tags/" + keyword.substring(1);
                title_div.innerHTML="<div class='title-container'><span class='title-bar'>" + posts_length + " posts with hashtag " + "<a href=" + link + ">"+ keyword + "</a>" + ":" + "</span>";
            }
            this.createDisplay([...target_hashtag['Posts']]);
            target_div.insertAdjacentElement("afterend", title_div);
        }
  	event.preventDefault();
    }

    createDisplay(_posts){

        var a_tags = document.getElementsByClassName("v1Nh3");

        for (let tag of a_tags) {
            tag.style.display = "none";
        }

        console.log("Creating your display");
        var parent_div = document.getElementsByClassName("fx7hk")[0]
        //splitting array
        var grouped_array = [], size = 3;
        while (_posts.length > 0){
            grouped_array.push(_posts.splice(0, size));
        };
        //reversing the array to follow timeline order
        grouped_array.reverse();
        //get main IG area
        grouped_array.forEach(subarray => {
            var filler_images_length = 0;
            if (subarray.length % 3 != 0){
                filler_images_length = 3 - (subarray.length % 3);
            }

            var image_row = document.createElement("div");
            image_row.setAttribute("class", "Nnq7C weEfm ir-row");
            parent_div.insertAdjacentElement("afterend",image_row);
            //create row code
            subarray.forEach(item => {
                //console.log("Item being built: ", item);
                var image = document.createElement("div");
                image.setAttribute("class", "v1Nh3 kIKUG  _bz0w")
                image.innerHTML = `<a href="/p/${item['shortcode']}/"><div class="eLAPa"><div class="KL4Bh"><img class="FFVAD" srcset=${item['display_url']} decoding="auto" sizes="293px" style="object-fit: cover;"></div><div class="_9AhH0"></div></div><div class="u7YqG"><span class="mediatypesSpriteCarousel__filled__32 u-__7" aria-label="カルーセル"></span></div></a>`
                image_row.appendChild(image);
            });

            for(var i = 0; i < filler_images_length; i++){
                console.log("create filler: ",i);
                var blank_image = document.createElement("div");
                blank_image.setAttribute("class", "v1Nh3 kIKUG  _bz0w")
                image_row.appendChild(blank_image);
            }

            var ir_rows = document.getElementsByClassName("ir-row")
            var last_row = ir_rows[ir_rows.length-1];
            for (var i = 0; i < 6; i++) {
                var br = document.createElement("br")
                last_row.insertAdjacentElement("afterend", br);
            }

        });
    }

    getPercent(frequency){
        return Math.floor(frequency * 10000)/100;
    }

    getbarLength(percent){
        return Math.round(parseFloat(percent));
    }

    getbarStyle(frequency){
        let barLength = Math.round(Math.floor(frequency * 10000)/100);
         return {
            width: barLength <= 10 ? `${barLength}0%` : '100%'
        };
    }

    mapHashtags(hashtags) {
        var hash_tags_array = []
        var hash_tags = {};
        hashtags.forEach(tag => {
            var count = tag["Num"];
            if(hash_tags[tag["Keyword"]] ){
                hash_tags[tag["Keyword"]] = {
                    keyword: tag["Keyword"],
                    count: count++,
                    name: tag["Keyword"],
                    link: tag["Link"],
                    frequency: tag["Frequency"],
                    posts: tag["Posts"]
                }
            }else{
                hash_tags[tag["Keyword"]] = {
                    keyword: tag["Keyword"],
                    count: count,
                    name: tag["Keyword"],
                    link: tag["Link"],
                    frequency: tag["Frequency"],
                    posts: tag["Posts"]
                }
            }
        })

        //to do sort by count
        const hashtagHTML = Object.entries(hash_tags).map(([key, hashtag]) =>
                                         <React.Fragment
                                           key={hashtag.name}
                                         >
                                           <Col
                                             span={10}
                                             className="items-row"
                                           >
                                             <u className="items-item-name" onClick={this.handleClick.bind(this)}><a href={hashtag.link}>{hashtag.keyword}</a></u>
                                           </Col>
                                           <Col
                                             span={14}
                                             className="items-row"
                                           >
                                             <div className="item-bar-container">
                                               <span
                                                 className="item-bar"
                                                 style={this.getbarStyle(hashtag.frequency)}
                                               >
                                                 {hashtag.posts.length}
                                               </span>
                                             </div><span>{this.getPercent(hashtag.frequency)}%</span>
                                           </Col>
                                         </React.Fragment>
                                        );
        return hashtagHTML;
    }

    render(){
  	return (
            <Row type="flex" className="items-container" justify="space-between" gutter={16}>
              {this.mapHashtags(this.props.listItems)}
            </Row>
  	);
    }
}

export default ListCard;
