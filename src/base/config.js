export default {
    server: "http://39.105.130.90:80",
    // server: "http://127.0.0.1:3001",
    port: {
        find: `/service/find`,
        findOne: `/service/findOn`,
        content_hit: `/service/content_hit`,
        user:{
            create:'/service/user/create',
            userMsg:'/admin/user/user_msg',
            uploadfile: "/admin/upload",
            getone: "/admin/user/getone",
            updateUserImg:"/admin/user/update_img",
        },
        content:{
            homepageImg:'/admin/content/homepage_ph',
            getOne:'/admin/content/getone',
            cnSlidernews:'/admin/content/app_hp_newslist',
            channelPh:'/admin/content/channel_ph',
            channelList:'/admin/content/list',
            search:'/admin/content/search',
            updateComment:'/admin/content/update_comment'
        },
        channel:{
            list:'/admin/channel/list'
        },
        login:{
            dologin:'/admin/login'
        },
        comment:{
            doComment:'/admin/comment/create',
            getCommentContent:'/admin/comment/page_content',
            getCommentVideo: '/admin/comment/page_video',
            updateReplyNum: "/admin/comment/update_reply",
            updatePraiseNum:"/admin/comment/update_praise"
        },
        reply:{
            doReply:'/admin/reply/create',
            getReply:'/admin/reply/list',
            remove:'/admin/reply/remove'
        },
        praise:{
            create:'/admin/praise/create',
            getpraise: "/admin/praise/list",
            remove:'/admin/praise/remove'
        },
        isEmergencies:{
            homeList:'/admin/isEmergencies/home_list'
        },
        video:{
            getList:'/admin/video/applist',
            getOne:'/admin/video/getone',
            updateComment:'/admin/video/update_comment'
        },
        doregister: "/admin/user/create"
        
       
    }
}