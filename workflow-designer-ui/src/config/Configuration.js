import config from './Config.json';

class Configuration {
    getPrefix() {
        return config['aeePrefix'];
    }

    getPrefixedUrl(url) {
        return this.getPrefix() + '/' + url;
    }
}
const c = new Configuration();
export default c;
