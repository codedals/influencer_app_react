/*global chrome*/
/* src/content.js */
import React from 'react';
import "./css/engagement.css";
import "antd/dist/antd.css";
import MediaCard from "./mediaCard.js";
import MentionsCard from "./mentionsCard.js";
import ListCard from "./listCard.js";
import SideMenu from "./sideMenu.js";
import PaginateHolder from "./paginateHolder.js";
import Paginate from "./paginate.js";
import ScrollDown from "./scrolldown.js"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { Card, Row, Col, Layout, Menu, Icon } from 'antd';
import {observer} from 'mobx-react';
const { Header, Footer, Sider, Content } = Layout;
var numeral = require('numeral');

@observer
class EngagementComponent extends React.Component {

    componentWillReceiveProps(nextProps) {
	this.setState({ profile: nextProps.profile,
                        favorites: nextProps.favorites,
                        refreshed: nextProps.refreshed
                      });
    }

    constructor(props){
        super(props);
        this.state = {
            profile: props.profile,
            favorites: props.favorites
        };
    }

    componentWillMount(){
        this.menuComponents = [
            {
                name:'Media',
                icon:['fab', 'youtube'],
                component: <MediaCard account = {this.props.listStore.account} profile={this.state.profile}></MediaCard>
            },
            {
                name:'Mentions',
                icon:['fas', 'at'],
                component: <ListCard listItems={this.props.listStore.mentions}></ListCard>
            },
            {
                name:'Hashtags',
                icon:['fas', 'hashtag'],
                component: <ListCard listItems={this.props.listStore.hashtags}></ListCard>
            },
            {
                name:'Image Content',
                icon:['fas', 'image'],
                component: <ListCard listItems={this.props.listStore.images}></ListCard>
            },
            {
                name:'Tagged Locations',
                icon:['fas', 'map-marker-alt'],
                component:<ListCard listItems={this.props.listStore.locations}></ListCard>
            },
            {
                name:'Brand Partners',
                icon:['fas', 'handshake'],
                component:<ListCard listItems={this.props.listStore.partners}></ListCard>
            },
            {
                name:'Tagged Accounts',
                icon:['fas', 'user-circle'],
                component:<ListCard listItems={this.props.listStore.taggedaccounts}></ListCard>
            },
            {
                name:'Favorites',
                icon:['fas', 'heart'],
                component: <PaginateHolder favoritesCallback={this.props.favoritesCallback} favorites={this.state.favorites}></PaginateHolder>
            }
        ];

        this.state = {
            current: 'overall',
            menuComponent: this.menuComponents[0],
            user_id: null
        }
    }

    menuClick = (e) => {
        console.log("KEY: ", e.key);
        this.setState({
            current: e.key
        });
    }

    sideMenuClick = (e) => {
        console.log(`${e.key} outside menu`);
        this.setState({ menuComponent: this.menuComponents[e.key] });
        this.state.menuComponent.name == 'Favorites' ? this.props.hideFooter() : this.props.showFooter();
    }

    render(){
        var engagementRate;
        var postsPerDay;
        var avgLikes;
        var avgCommentsPerImage;

        switch(this.state.current){
        case "overall":
            engagementRate = this.props.profile.attributes.engagementRate;
            postsPerDay = this.props.profile.attributes.postsPerDay;
            avgLikes = this.props.profile.attributes.avgLikes;
            avgCommentsPerImage = this.props.profile.attributes.avgCommentsPerImage;
            break;
        case "7days":
            engagementRate = this.props.profile.attributes.engagementRate7;
            postsPerDay = this.props.profile.attributes.postsPerDay7;
            avgLikes = this.props.profile.attributes.avgLikes7;
            avgCommentsPerImage = this.props.profile.attributes.avgCommentsPerImage7;
            break;
        case "30days":
            engagementRate = this.props.profile.attributes.engagementRate30;
            postsPerDay = this.props.profile.attributes.postsPerDay30;
            avgLikes = this.props.profile.attributes.avgLikes30;
            avgCommentsPerImage = this.props.profile.attributes.avgCommentsPerImage30;
            break;
        case "90days":
            engagementRate = this.props.profile.attributes.engagementRate90;
            postsPerDay = this.props.profile.attributes.postsPerDay90;
            avgLikes = this.props.profile.attributes.avgLikes90;
            avgCommentsPerImage = this.props.profile.attributes.avgCommentsPerImage90;
            break;
        }


  	return (
  	    <div style={{ height: '100%'}}>
              { this.state.menuComponent.name == 'Favorites' ?
            <React.Fragment>
              <div className="engagement-main">
                <section style={{ position: 'relative', height: '100%'}}>
                  <SideMenu
                    onClick={this.sideMenuClick}
                    icon={this.state.menuComponent.icon}
                    name={this.state.menuComponent.name}
                    fullLength
                  >
                  </SideMenu>
                  <section className="component-wrapper">
                    <Card className="mainBodyCard favorites">
                      <div className="mainBodyTitle"><span><FontAwesomeIcon icon={this.state.menuComponent.icon} fixedWidth/><span>{this.state.menuComponent.name}</span></span></div>
                        {this.state.menuComponent.component}
                    </Card>
                  </section>
                </section>
              </div>

              <ScrollDown complete={false}/>
            </React.Fragment>
            :
            <React.Fragment>
              <div className="engagement-main">
                <Card className="mainBodyCard1">
            	    <Menu
                    onClick={this.menuClick}
                    selectedKeys={[this.state.current]}
                    mode="horizontal"
                    style={{ backgroundColor: 'transparent', color: 'rgba(180, 180, 180, 1)'}}
                  >
                    <Menu.Item key="overall">
                      ALL
                    </Menu.Item>
                    <Menu.Item key="7days">
                      7 DAY
                    </Menu.Item>
                    <Menu.Item key="30days">
                      30 DAY
                    </Menu.Item>
                    <Menu.Item key="90days">
                      90 DAY
                    </Menu.Item>
                  </Menu>

                  <Row>
                    <span style={{fontSize:'2em'}}>{Math.floor(engagementRate * 10000)/100}%</span>
                    <h5>ENGAGEMENT RATE</h5>
                  </Row>
                  <Row>
                    <Col span={8}>
                      <span>{postsPerDay.toFixed(2)}</span>
                      <h5>POST PER DAY</h5>
                    </Col>
                    <Col span={8}>
                      <span>{numeral(avgLikes).format('0.0a')}</span>
                      <h5>AVG LIKES</h5>
                    </Col>
                    <Col span={8}>
                      <span>{numeral(avgCommentsPerImage).format('0.0a')}</span>
                      <h5>AVG COMMENTS</h5>
                    </Col>
                  </Row>
          	</Card>

                <section style={{ position: 'relative', height: '60%'}}>
                  <SideMenu
                    onClick={this.sideMenuClick}
                    icon={this.state.menuComponent.icon}
                    name={this.state.menuComponent.name}
                  >
                  </SideMenu>
                  <section className="component-wrapper">
                    <Card className="mainBodyCard">
                      <div className="mainBodyTitle"><span><FontAwesomeIcon icon={this.state.menuComponent.icon} fixedWidth/><span style={{paddingLeft:"0.5em"}}>{this.state.menuComponent.name}</span></span></div>
                      {this.state.menuComponent.component}
                    </Card>
                  </section>
                </section>
              </div>

              <ScrollDown complete={true}/>
            </React.Fragment>
          }

  	    </div>
  	)
  }
}

export default EngagementComponent;
