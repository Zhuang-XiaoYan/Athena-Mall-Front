<template>
    <div class="footer">
        <div class="footer-container">
            <div class="footerList">
                <div class="footerItem">
                    <h4>购物指南</h4>
                    <ul class="footerItemCon">
                        <li>购物流程</li>
                        <li>会员介绍</li>
                        <li>生活旅行/li>
                        <li>常见问题</li>
                        <li>大家电</li>
                        <li>联系客服</li>
                    </ul>

                </div>
                <div class="footerItem">
                    <h4>配送方式</h4>
                    <ul class="footerItemCon">
                        <li>上门自提</li>
                        <li>211限时达</li>
                        <li>配送服务查询</li>
                        <li>配送费收取标准</li>
                        <li>偏远地区配送</li>
                    </ul>
                </div>
                <div class="footerItem">
                    <h4>支付方式</h4>
                    <ul class="footerItemCon">
                        <li>货到付款</li>
                        <li>在线支付</li>
                        <li>分期付款</li>
                        <li>邮局汇款</li>
                        <li>公司转账</li>
                    </ul>
                </div>
                <div class="footerItem">
                    <h4>售后服务</h4>
                    <ul class="footerItemCon">
                        <li>售后政策</li>
                        <li>价格保护</li>
                        <li>退款说明</li>
                        <li>返修/退换货</li>
                        <li>取消订单</li>
                    </ul>
                </div>
                <div class="footerItem">
                    <h4>特色服务</h4>
                    <ul class="footerItemCon">
                        <li>夺宝岛</li>
                        <li>DIY装机</li>
                        <li>延保服务</li>
                        <li>Vue-Mall体验卡</li>
                        <li>Vue-Mall通信</li>
                    </ul>
                </div>
                <div class="footerItem">
                    <h4>京东自营覆盖区县</h4>
                    <ul class="footerItemCon">
                        <li>中国大陆</li>
                        <li>中国港澳地区</li>
                        <li>中国台湾</li>
                        <li>海外地区</li>
                    </ul>
                </div>
            </div>
            <div class="copyright">
                <div class="helpLink">
                    <li>关于我们<span class="space"></span></li>
                    <li>联系我们<span class="space"></span></li>
                    <li>联系客服<span class="space"></span></li>
                    <li>合作招商<span class="space"></span></li>
                    <li>商家帮助<span class="space"></span></li>
                    <li>营销中心<span class="space"></span></li>
                    <li>手机Vue-Mall<span class="space"></span></li>
                    <li>友情链接<span class="space"></span></li>
                    <li>销售联盟 <span class="space"></span></li>
                    <li>Vue-Mall社区 <span class="space"></span></li>
                    <li>风险监测<span class="space"></span></li>
                    <li>隐私政策<span class="space"></span></li>
                    <li>Vue-Mall公益<span class="space"></span></li>
                    <li>Media & IR</li>
                </div>
                <hr>
                <div class="message">
                   <span>
                        <a href="">沪公网安备 110105014669</a>
                        <a href="">京ICP证070359号</a>
                        <a href="">互联网药品信息服务资格证编号(京)-经营性-2022-0008</a>
                        <a href="" style="border-right:none">新出发京零 字第大120007号</a>
                   </span>
                    <span>
                        <a href="">互联网出版社许可证编号新出网(沪)字180号</a>
                        <a href="">出版物经营许可证</a>
                        <a href="">网络文化经营许可证沪网文[2022]6258-1582号</a>
                        <a href="" style="border-right:none">举报和不良信息举报电话：45896999856</a>
                    </span>
                    <span>
                        <a href="">Copyright © 2022-2050 Vue-Mall版权所有</a>
                        <a href="">消费者维权热线：487969856955</a>
                        <a href="">经营执照</a>
                        <a href="">(沪)网械平台备字(2022)第1002号码</a>
                        <a href="" style="border-right:none">增值电信业务经营许可证</a>
                    </span>
                </div>
                <div class="images">
                    <img alt="" src="./images/bot1.gif"/>
                    <img alt="" src="./images/bot2.gif"/>
                    <img alt="" src="./images/bot3.png"/>
                    <img alt="" src="./images/bot4.png"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "FooterPage"
}
</script>

<style scoped>

.footer {
    background-color: #eaeaea;
}

.footer .footer-container {
    width: 1200px;
    height: 350px;
    margin: 0 auto;
    padding: 0 15px;
}

.footer .footer-container .footerList {
    text-align: center;
    padding: 20px;
    border-bottom: 1px solid #e4e1e1;
    border-top: 1px solid #e4e1e1;
    overflow: hidden;
    padding-left: 40px;
}

.footer .footer-container .footerList .footerItem {
    width: 16.6666667%;
    float: left;
}

.footer .footer-container .footerList .footerItem h4 {
    font-size: 14px;
}

.footer .footer-container .footerList .footerItem .footerItemCon li {
    line-height: 18px;
}

.footer .footer-container .footerList .footerItem:last-child img {
    width: 121px;
}

.footer .footer-container .copyright {
    padding: 20px;
}

.footer .footer-container .copyright .helpLink {
    text-align: center;
}

.footer .footer-container .copyright .helpLink li {
    display: inline;
}

.footer .footer-container .copyright .helpLink li .space {
    border-left: 1px solid #666;
    width: 1px;
    height: 13px;
    background: #666;
    margin: 8px 10px;
}

.footer .footer-container .copyright .message {
    width: 1210px;
    height: 70px;
    float: left;
    margin: 10px 0px;
}

.footer .footer-container .copyright .message a {
    padding-right: 10px;
    padding-left: 10px;
    line-height: 15px;
    border-right: 1px solid #ccc;
    color: #666;
}

.footer .footer-container .copyright .message span {
    width: 1210px;
    height: 14px;
    float: left;
    text-align: center;
    color: #666;
    margin: 5px 5px;
}

.footer .footer-container .copyright .message a {
    padding-right: 5px;
    color: #666;
}

.footer .footer-container .copyright .message a:hover {
    color: #E4393C;
    text-decoration: underline;
}

.footer .footer-container .copyright .images {
    width: 1210px;
    height: 40px;
    float: left;
    text-align: center;
    margin-top: 5px;
    margin-bottom: 5px;
}

.footer .footer-container .copyright .images img {
    margin-left: 10px;
    margin-top: 5px;
    margin-bottom: 10px;
}

</style>