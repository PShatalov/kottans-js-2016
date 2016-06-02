const PostHtml = require('posthtml');

let markup =
`
<div class='row'>
    <div class="col-md-1"></div>
    <div class="col-xs-9"></div>
    <p class='js-smth'></p>
    </div>
`;

const plugin = tree => tree.match({attrs: {class: true}}, node => {
    let className = node.attrs.class;
    if(/^col-(xs|sm|md|lg)?(-\w+)?-\d+/i.test(className)) {
        node.attrs.class = null;
    } else if(/^js/.test(className)) {
        node.attrs.class = null;
        node.attrs['data-js'] = className;
    }
    return node;
});

PostHtml([plugin]).process(markup).then(result => {
    console.log(result.html)
})