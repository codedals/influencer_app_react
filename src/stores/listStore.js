import {autorun, decorate, observable, computed, action } from "mobx"


class ListStore {

    @observable hashtags = [];
    @observable mentions = [];
    @observable images = [];
    @observable locations = [];
    @observable taggedaccounts = [];
    @observable partners = [];
    @observable account = {};

    constructor() {
        autorun(() => console.log("Reporting from mobx: ", this.account));
    }

    @computed get report() {
	if (this.hashtags.length === 0)
	    return "<none>";
	return `hashtag: "${this.hashtags}". `;
    }


    setAccount(_account){
        this.account = _account;
    }

    addItem(type, item){
        switch (type){
        case "hashtag":
	    this.hashtags.push({
                Num: item["Num"],
                Keyword: item["Keyword"],
                Frequency: item["Frequency"],
                Link: item["Link"],
                Posts: item["Posts"]
	    });
            break;
        case "mentions":
            this.mentions.push({
	        Num: item["Num"],
                Keyword: item["Keyword"],
                Frequency: item["Frequency"],
                Link: item["Link"],
                Posts: item["Posts"]
	    });
            break;
        case "images":
            this.images.push({
	        Num: item["Num"],
                Keyword: item["Keyword"],
                Frequency: item["Frequency"],
                Link: item["Link"],
                Posts: item["Posts"]
	    });
            break;
        case "locations":
            this.locations.push({
	        Num: item["Num"],
                Keyword: item["Keyword"],
                Frequency: item["Frequency"],
                Link: item["Link"],
                Posts: item["Posts"]
	    });
            break;
        case "taggedaccounts":
            this.taggedaccounts.push({
	        Num: item["Num"],
                Keyword: item["Keyword"],
                Frequency: item["Frequency"],
                Link: item["Link"],
                Posts: item["Posts"]
	    });
            break;
        case "partners":
            this.partners.push({
	        Num: item["Num"],
                Keyword: item["Keyword"],
                Frequency: item["Frequency"],
                Link: item["Link"],
                Posts: item["Posts"]
	    });
            break;
        }
    }

}

export default ListStore = new ListStore();
