/*global chrome*/
/* src/content.js */
import React from 'react';
import "./css/mediaCard.css";
import "antd/dist/antd.css";
import { Card, Row, Col, Layout, Menu, Icon } from 'antd';

import {observer} from 'mobx-react';
const { Meta } = Card;
const SubMenu = Menu.SubMenu;
var numeral = require('numeral');


@observer
class MediaCard extends React.Component{

    constructor(props) {
    	super(props);
    }


    componentWillReceiveProps() {
        //Hack to force re-render so FontAwesome is loaded correctlyq
        setTimeout(() => this.forceUpdate(), 100)
    }

    render(){
        return (
            <Row type="flex" justify="space-between" gutter={16}>
              <Col span={12}>
                <Card className="mediaCardBody" bordered={false}>
                  <Row>
                    <Icon style={{ color: '#67D7D5', marginRight: '1em' }} theme="outlined" type="youtube" />
                    <span className="cardTitle" >{this.props.profile.attributes.videosCount} VIDEOS</span>
                  </Row>
                  <Row gutter={16}>
                    <Col span={12}>
                      <span>{Math.floor(this.props.profile.attributes.engagementRateVideos * 10000)/100}%</span>
                      <h5>ENG. RATE</h5>
                    </Col>
                    <Col span={6}>
                      <span>{numeral(this.props.profile.attributes.avgViewsPerVideo).format('0.0a')}</span>
                      <h5>AVG VIEWS</h5>
                    </Col>
                  </Row>
                  <Row gutter={16}>
                    <Col span={12}>
                      <span>{numeral(this.props.profile.attributes.avgLikesPerVideo).format('0.0a')}</span>
                      <h5>AVG LIKES</h5>
                    </Col>
                    <Col span={12}>
                      <span>{numeral(this.props.profile.attributes.avgCommentsPerVideo).format('0.0a')}</span>
                      <h5>AVG COM.</h5>
                    </Col>
                  </Row>
                </Card>
              </Col>
              <Col span={12}>
                <Card className="mediaCardBody" bordered={false}>
                  <Row>
                    <Icon style={{ color: '#67D7D5', marginRight: '1em' }} theme="outlined" type="picture" />
                    <span className="cardTitle" >{this.props.profile.attributes.imagesCount}  IMAGES</span>
                  </Row>
                  <Row gutter={16}>
                    <Col span={12}>
                      <span>{Math.floor(this.props.profile.attributes.engagementRateImages * 10000)/100}%</span>
                      <h5>ENG. RATE</h5>
                    </Col>
                    <Col span={6}>
                      <span>{numeral(this.props.profile.attributes.avgLikesPerImage).format('0.0a')}</span>
                      <h5>AVG LIKES</h5>
                    </Col>
                  </Row>
                  <Row gutter={16}>
                    <Col span={24}>
                      <span>{numeral(this.props.profile.attributes.avgCommentsPerImage).format('0.0a')}</span>
                      <h5>AVG COMMENTS</h5>
                    </Col>
                  </Row>
                </Card>
              </Col>
            </Row>
  	)
    }
}
export default MediaCard;
