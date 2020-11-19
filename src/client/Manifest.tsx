import * as React from 'react';
import GetLore from './GetLore';

class Manifest extends React.Component<IAppProps, IAppState> {
  constructor(props: IAppProps) {
		super(props);
		this.state = {
      lang: 'en',
      version: null,
      manifest: null,
      buckets: [],
      data: [],
      isFetching: false
		};
    this.getData = this.getData.bind(this);
    this.getManifest = this.getManifest.bind(this);
	}

  componentDidMount() {
    this.getManifest();
  }

  getManifest() {
    this.setState({ isFetching: true });
    fetch("https://www.bungie.net/Platform/Destiny2/Manifest/", {
      method: "GET",
      headers: {
        Accept: "application/json"
      }
    })
      .then((response) => response.json())
      .then((json) => {
        const lang = this.state.lang
        ? this.state.lang
        : "en";
        this.setState({
          version: json.Response.version,
          manifest: json.Response.jsonWorldContentPaths[lang],
          buckets: json.Response.jsonWorldComponentContentPaths[lang]
        });
        console.log('response', json.Response);
        console.log('buckets', json.Response.jsonWorldComponentContentPaths[lang]);
        this.setState({ isFetching: false });
    });
  }

  getData() {
    this.setState({ isFetching: true });
    const bucket = this.state.buckets;
    const loreBucket = bucket['DestinyLoreDefinition'] ? bucket['DestinyLoreDefinition'] :
      '/common/destiny2_content/json/en/DestinyEnemyRaceDefinition-fa85ede1-df2f-469e-8bd4-cfa6be7fad04.json';
    fetch(`https://www.bungie.net/${loreBucket}`, {
      method: "GET",
      headers: {
        Accept: "application/json"
      }
    })
      .then((response) => response.json())
      .then((json) => {
        this.setState({
          data: json,
          isFetching: false
        });
        console.log("data", this.state.data);
      });
  }

  renderLore() {
    return (
      <ul>
        {Object.values(this.state.data).map((item) => (
          <li key={item.hash}>{item.displayProperties.name}</li>
        ))}
      </ul>
    );
  }

  saveLore() {
    //version check
    // save Lore db as Array
    // push to server
  }

  render() {
    console.log("-----RENDER-----");
    return (
      <div>
        <GetLore
          onFormSubmit={this.getData}
          isSearching={this.state.isFetching}
          onGetLore={() => this.getData}
        />
        {this.state.isFetching ? "Loading..." : this.renderLore()}
      </div>
    );
  }

}

export interface IAppProps {}

export interface IAppState {
	lang: string, version: string, manifest: string, buckets: Array<any>, data: Array<any>, isFetching: boolean;
}

export default Manifest;
