(window.onhashchange = function () {
    switch (location.hash) {
        case '':
            $('body').html('');
            location.hash = '#/briefintroduction';
            break;
        case '#/briefintroduction':
            $('body').html('');
            briefintroduction();
            break;
        case '#/approveddocuments':
            $('body').html('');
            approveddocuments();
            break;
        case '#/licence':
            $('body').html('');
            licence();
            break;
        default:
            if (location.hash.search('#/approveddocumentsSub/') != -1) {
                $('body').html('');
                approveddocumentsSub();
            } else {
                $('body').html('');
                location.hash = '#/briefintroduction';
            }
            break;
    }
})();

function menu() {
    return $('<div></div>')
        .attr('class', 'ui large secondary pointing menu')
        .css({ 'margin-top': '2%', 'margin-left': '12%', 'margin-right': '12%' })
        .append($('<a></a>')
            .attr('class', 'item')
            .attr('id', 'menu1')
            .click(function () {
                location.hash = '#/briefintroduction';
            })
            .text('简介')
        )
        .append($('<a></a>')
            .attr('class', 'item')
            .attr('id', 'menu2')
            .click(function () {
                location.hash = '#/approveddocuments';
            })
            .text('审核通过的文件')
        )
        .append($('<a></a>')
            .attr('class', 'item')
            .attr('id', 'menu3')
            .click(function () {
                location.hash = '#/licence';
            })
            .text('PBGPOPL许可证')
        )
}

function briefintroduction() {
    document.title = '简介 - 思远游戏专利局官网';
    $('body')
        .append(menu())
        .append($('<div></div>')
            .attr('class', 'ui large segment')
            .css({ 'margin-top': '1%', 'margin-left': '15%', 'margin-right': '15%' })
            .append($('<div></div>')
                .attr('class', 'ui two column very relaxed grid')
                .append($('<div></div>')
                    .append($('<p></p>')
                        .append($('<img></img>')
                            .attr('class', 'ui large bordered image')
                            .css('margin', '5px')
                            .css('margin-left', '10px')
                            .attr('src', 'https://www.helloimg.com/images/2022/10/24/Zr6dHK.jpg')
                        )
                    )
                )
                .append($('<div></div>')
                    .attr('class', 'column')
                    .attr('id', 'my')
                    .append($('<p></p>')
                        .text('Loading...')
                    )
                )
                .ready(function () {
                    $('#my').empty()
                        .append($('<p></p>')
                            .append($('<span></span>')
                                .attr('class', 'ui big text')
                                .text('思远游戏专利局官网')
                            )
                        )
                        .append($('<p></p>')
                            .append($('<span></span>')
                                .attr('class', 'ui large text')
                                .text('思远游戏专利局创建目的为维护大家的文件著作权，每一个向思远游戏专利局申请专利的文件审核通过后会获得一个专利号。')
                            )
                        )
                        .append($('<p></p>')
                            .text('审核通过的文件记录了所有审核通过的文件的发布地址与专利号等信息；')
                        )
                        .append($('<p></p>')
                            .text('许可证是思远游戏专利局审核通过的文件的著作权保障书。')
                        )
                        .removeAttr('id');
                })
            )
        );
    $('#menu1').attr('class', 'active item');
}

function approveddocuments() {
    document.title = '审核通过的文件 - 思远游戏专利局官网';
    let blogs = [], search = '';
    function refresh() {
        let list = $('#list').empty();
        for (let i in blogs) {
            let content = blogs[i].title + '\n\n' + marked.parse(blogs[i].body);
            if (content.search(search) != -1) {
                list.append($('<div></div>')
                    .attr('class', 'item')
                    .append($('<div></div>')
                        .attr('class', 'content')
                        .append($('<p></p>')
                            .append($('<a></a>')
                                .attr('class', 'ui medium header')
                                .attr('click_id', blogs[i].number)
                                .css('float', 'left')
                                .text(blogs[i].title)
                                .click(function () {
                                    window.open(`/#/approveddocumentsSub/${$(this).attr('click_id')}`)
                                })
                            )
                            .append($('<span></span>')
                                .attr('class', 'ui small text')
                                .css('margin-left', '20px')
                                .text(`#${blogs[i].number}`)
                            )
                            .append($('<em></em>')
                                .css('float', 'right')
                                .text('By 思远游戏专利局')
                            )
                        )
                        .append($('<div></div>')
                            .attr('class', 'description')
                            .text(`Updated at ${new Date(blogs[i].updated_at).toLocaleString()}`)
                        )
                    )
                );
            }
        }
    }
    $('body')
        .append(menu())
        .append($('<div></div>')
            .attr('class', 'ui segment')
            .css({ 'margin-top': '5%', 'margin-left': '15%', 'margin-right': '15%' })
            .append($('<div></div>')
                .attr('class', 'ui large relaxed divided list')
                .attr('id', 'list')
                .ready(function () {
                    $.get('https://api.github.com/repos/baosiyuancode/PBGPOOW/issues?creator=BaoSiYuanCODE&state=open&per_page=10000&page=1', function (json, status) {
                        blogs = json;
                        blogs.sort(function (x, y) {
                            return Date.parse(y.updated_at) - Date.parse(x.updated_at);
                        });
                        refresh();
                    });
                })
            )
        );
    $('.right.menu')
        .prepend($('<div></div>')
            .attr('class', 'item')
            .append($('<div></div>')
                .attr('class', 'ui transparent icon input')
                .append($('<input></input>')
                    .attr('class', 'prompt')
                    .attr('type', 'text')
                    .attr('placeholder', '搜索...')
                    .bind('input', function () {
                        search = $(this).val();
                        refresh();
                    })
                )
            )
        );
    $('#menu2').attr('class', 'active item');
}

function approveddocumentsSub() {
    document.title = '审核通过的文件 - 思远游戏专利局官网';
    let id = location.hash.split('#/approveddocumentsSub/')[1];
    $('body')
        .append(menu())
        .append($('<div></div>')
            .attr('class', 'ui segment')
            .css({ 'margin-top': '5%', 'margin-left': '15%', 'margin-right': '15%' })
            .append($('<h></h>')
                .attr('class', 'ui big header')
                .attr('id', 'title')
                .css('float', 'left')
            )
            .append($('<em></em>')
                .attr('class', 'ui text')
                .attr('id', 'id')
                .css('margin-left', '20px')
            )
            .append($('<div></div>')
                .attr('class', 'ui segment')
                .attr('id', 'content')
            )
            .ready(function () {
                $.get(`https://api.github.com/repos/BaoSiYuanCODE/PBGPOOW/issues/${id}`, function (json, status) {
                    marked.setOptions({
                        highlight: function (code) {
                            return hljs.highlightAuto(code).value;
                        }
                    });
                    $('#title').text(json.title).removeAttr('id');
                    $('#id').text(`#${json.number}`).removeAttr('id');
                    $('#content').html(marked.parse(json.body)).removeAttr('id');
                    $('img').css({ 'border': 'none', 'max-width': '70%' })
                });
            })
        );
    $('#menu2').attr('class', 'active item');
}

function licence() {
    document.title = 'PBGPOPL许可证 - 思远游戏专利局官网';
    let json = [];
    function cout() {
        $('#licence').empty();
        marked.setOptions({
            highlight: function (licence) {
                return hljs.highlightAuto(licence).value;
            }
        });
        for (let i in json) {
            let k = json[i];
            if (k.name=='LICENSE.md') {
                let thi = $(this);
                let a;
                $.get(k.git_url, function (body) {
                    function b64_to_utf8(str) {
                        return decodeURIComponent (escape(window.atob(str)));
                    }                        
                    body = b64_to_utf8(body.content);
                    a=body;
                    console.log(a)
                    $('#licence')
                    .append($('<div></div>')
                        .attr('class', 'content')
                        .html(marked.parse(a))
                    );
                });
            }
        }
        $('pre').attr('style', 'white-space: pre-wrap!important;');
    }
    $('body')
        .append(menu())
        .append($('<div></div>')
            .attr('class', 'ui  big segment')
            .css({ 'margin-top': '5%', 'margin-left': '14%', 'margin-right': '14%' })
            .append($('<div></div>')
                .attr('class', 'ui cards')
                .attr('id', 'licence')
                .ready(function () {
                    $.get('https://api.github.com/repos/baosiyuancode/PBGPOOW/contents/', function (body, status) {
                        json = body;
                        cout();
                    })
                })
            )
        )
    cout();    
    $('#menu3').attr('class', 'active item');
}