<template>
    <div class="page admin-box" element-loading-text="正在加载中">
        <SkeletonTemplate>
            <relation-state></relation-state>
            <div class="gva-card-box">
                <div class="gva-card gva-top-card">
                    <div class="gva-top-card-left">
                        <div class="gva-top-card-left-title">早安，管理员，请开始一天的工作吧</div>
                        <div class="gva-top-card-left-dot">今日晴，0℃ - 10℃，天气寒冷，注意添加衣物。</div>
                        <div >
                            <div class="gva-top-card-left-item"> 使用教学： <a 
                                    target="view_window" href="https://www.bilibili.com/video/BV1Rg411u7xH/"
                                    style="color: rgb(64, 158, 255);">https://www.bilibili.com/video/BV1Rg411u7xH</a></div>
                            <div class="gva-top-card-left-item"> 插件仓库： <a 
                                    target="view_window" href="https://plugin.gin-vue-admin.com/#/layout/home"
                                    style="color: rgb(64, 158, 255);">https://plugin.gin-vue-admin.com</a></div>
                        </div>
                    </div>
                    <img src="@/assets/imgs/8.png" class="gva-top-card-right" alt="">
                </div>
            </div>
            <div class="gva-card-box">
                <div class="el-card is-always-shadow gva-card quick-entrance">
                    <div class="el-card__header">
                        <div class="card-header"><span >快捷入口</span></div>
                    </div>
                    <div class="el-card__body" style="">
                        <div class="el-row" style="margin-left: -10px; margin-right: -10px;">
                            <div class="el-col el-col-4 el-col-xs-8 is-guttered quick-entrance-items"
                                style="padding-right: 10px; padding-left: 10px;">
                                <div class="quick-entrance-item">
                                    <div class="quick-entrance-item-icon"
                                        style="background-color: rgba(255, 156, 110, 0.3);"><i 
                                            class="el-icon"><svg xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 1024 1024" style="color: rgb(255, 156, 110);">
                                                <path fill="currentColor"
                                                    d="M544 768v128h192a32 32 0 1 1 0 64H288a32 32 0 1 1 0-64h192V768H192A128 128 0 0 1 64 640V256a128 128 0 0 1 128-128h640a128 128 0 0 1 128 128v384a128 128 0 0 1-128 128H544zM192 192a64 64 0 0 0-64 64v384a64 64 0 0 0 64 64h640a64 64 0 0 0 64-64V256a64 64 0 0 0-64-64H192z">
                                                </path>
                                            </svg></i></div>
                                    <p >用户管理</p>
                                </div>
                            </div>
                            <div class="el-col el-col-4 el-col-xs-8 is-guttered quick-entrance-items"
                                style="padding-right: 10px; padding-left: 10px;">
                                <div class="quick-entrance-item">
                                    <div class="quick-entrance-item-icon"
                                        style="background-color: rgba(105, 192, 255, 0.3);"><i 
                                            class="el-icon"><svg xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 1024 1024" style="color: rgb(105, 192, 255);">
                                                <path fill="currentColor"
                                                    d="M600.704 64a32 32 0 0 1 30.464 22.208l35.2 109.376c14.784 7.232 28.928 15.36 42.432 24.512l112.384-24.192a32 32 0 0 1 34.432 15.36L944.32 364.8a32 32 0 0 1-4.032 37.504l-77.12 85.12a357.12 357.12 0 0 1 0 49.024l77.12 85.248a32 32 0 0 1 4.032 37.504l-88.704 153.6a32 32 0 0 1-34.432 15.296L708.8 803.904c-13.44 9.088-27.648 17.28-42.368 24.512l-35.264 109.376A32 32 0 0 1 600.704 960H423.296a32 32 0 0 1-30.464-22.208L357.696 828.48a351.616 351.616 0 0 1-42.56-24.64l-112.32 24.256a32 32 0 0 1-34.432-15.36L79.68 659.2a32 32 0 0 1 4.032-37.504l77.12-85.248a357.12 357.12 0 0 1 0-48.896l-77.12-85.248A32 32 0 0 1 79.68 364.8l88.704-153.6a32 32 0 0 1 34.432-15.296l112.32 24.256c13.568-9.152 27.776-17.408 42.56-24.64l35.2-109.312A32 32 0 0 1 423.232 64H600.64zm-23.424 64H446.72l-36.352 113.088-24.512 11.968a294.113 294.113 0 0 0-34.816 20.096l-22.656 15.36-116.224-25.088-65.28 113.152 79.68 88.192-1.92 27.136a293.12 293.12 0 0 0 0 40.192l1.92 27.136-79.808 88.192 65.344 113.152 116.224-25.024 22.656 15.296a294.113 294.113 0 0 0 34.816 20.096l24.512 11.968L446.72 896h130.688l36.48-113.152 24.448-11.904a288.282 288.282 0 0 0 34.752-20.096l22.592-15.296 116.288 25.024 65.28-113.152-79.744-88.192 1.92-27.136a293.12 293.12 0 0 0 0-40.256l-1.92-27.136 79.808-88.128-65.344-113.152-116.288 24.96-22.592-15.232a287.616 287.616 0 0 0-34.752-20.096l-24.448-11.904L577.344 128zM512 320a192 192 0 1 1 0 384 192 192 0 0 1 0-384zm0 64a128 128 0 1 0 0 256 128 128 0 0 0 0-256z">
                                                </path>
                                            </svg></i></div>
                                    <p >角色管理</p>
                                </div>
                            </div>
                            <div class="el-col el-col-4 el-col-xs-8 is-guttered quick-entrance-items"
                                style="padding-right: 10px; padding-left: 10px;">
                                <div class="quick-entrance-item">
                                    <div class="quick-entrance-item-icon"
                                        style="background-color: rgba(179, 127, 235, 0.3);"><i 
                                            class="el-icon"><svg xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 1024 1024" style="color: rgb(179, 127, 235);">
                                                <path fill="currentColor"
                                                    d="M160 448a32 32 0 0 1-32-32V160.064a32 32 0 0 1 32-32h256a32 32 0 0 1 32 32V416a32 32 0 0 1-32 32H160zm448 0a32 32 0 0 1-32-32V160.064a32 32 0 0 1 32-32h255.936a32 32 0 0 1 32 32V416a32 32 0 0 1-32 32H608zM160 896a32 32 0 0 1-32-32V608a32 32 0 0 1 32-32h256a32 32 0 0 1 32 32v256a32 32 0 0 1-32 32H160zm448 0a32 32 0 0 1-32-32V608a32 32 0 0 1 32-32h255.936a32 32 0 0 1 32 32v256a32 32 0 0 1-32 32H608z">
                                                </path>
                                            </svg></i></div>
                                    <p >菜单管理</p>
                                </div>
                            </div>
                            <div class="el-col el-col-4 el-col-xs-8 is-guttered quick-entrance-items"
                                style="padding-right: 10px; padding-left: 10px;">
                                <div class="quick-entrance-item">
                                    <div class="quick-entrance-item-icon"
                                        style="background-color: rgba(255, 214, 102, 0.3);"><i 
                                            class="el-icon"><svg xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 1024 1024" style="color: rgb(255, 214, 102);">
                                                <path fill="currentColor"
                                                    d="M320 256a64 64 0 0 0-64 64v384a64 64 0 0 0 64 64h384a64 64 0 0 0 64-64V320a64 64 0 0 0-64-64H320zm0-64h384a128 128 0 0 1 128 128v384a128 128 0 0 1-128 128H320a128 128 0 0 1-128-128V320a128 128 0 0 1 128-128z">
                                                </path>
                                                <path fill="currentColor"
                                                    d="M512 64a32 32 0 0 1 32 32v128h-64V96a32 32 0 0 1 32-32zm160 0a32 32 0 0 1 32 32v128h-64V96a32 32 0 0 1 32-32zm-320 0a32 32 0 0 1 32 32v128h-64V96a32 32 0 0 1 32-32zm160 896a32 32 0 0 1-32-32V800h64v128a32 32 0 0 1-32 32zm160 0a32 32 0 0 1-32-32V800h64v128a32 32 0 0 1-32 32zm-320 0a32 32 0 0 1-32-32V800h64v128a32 32 0 0 1-32 32zM64 512a32 32 0 0 1 32-32h128v64H96a32 32 0 0 1-32-32zm0-160a32 32 0 0 1 32-32h128v64H96a32 32 0 0 1-32-32zm0 320a32 32 0 0 1 32-32h128v64H96a32 32 0 0 1-32-32zm896-160a32 32 0 0 1-32 32H800v-64h128a32 32 0 0 1 32 32zm0-160a32 32 0 0 1-32 32H800v-64h128a32 32 0 0 1 32 32zm0 320a32 32 0 0 1-32 32H800v-64h128a32 32 0 0 1 32 32z">
                                                </path>
                                            </svg></i></div>
                                    <p >代码生成器</p>
                                </div>
                            </div>
                            <div class="el-col el-col-4 el-col-xs-8 is-guttered quick-entrance-items"
                                style="padding-right: 10px; padding-left: 10px;">
                                <div class="quick-entrance-item">
                                    <div class="quick-entrance-item-icon"
                                        style="background-color: rgba(255, 133, 192, 0.3);"><i 
                                            class="el-icon"><svg xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 1024 1024" style="color: rgb(255, 133, 192);">
                                                <path fill="currentColor"
                                                    d="M805.504 320 640 154.496V320h165.504zM832 384H576V128H192v768h640V384zM160 64h480l256 256v608a32 32 0 0 1-32 32H160a32 32 0 0 1-32-32V96a32 32 0 0 1 32-32zm318.4 582.144 180.992-180.992L704.64 510.4 478.4 736.64 320 578.304l45.248-45.312L478.4 646.144z">
                                                </path>
                                            </svg></i></div>
                                    <p >表单生成器</p>
                                </div>
                            </div>
                            <div class="el-col el-col-4 el-col-xs-8 is-guttered quick-entrance-items"
                                style="padding-right: 10px; padding-left: 10px;">
                                <div class="quick-entrance-item">
                                    <div class="quick-entrance-item-icon"
                                        style="background-color: rgba(92, 219, 211, 0.3);"><i 
                                            class="el-icon"><svg xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 1024 1024" style="color: rgb(92, 219, 211);">
                                                <path fill="currentColor"
                                                    d="M512 512a192 192 0 1 0 0-384 192 192 0 0 0 0 384zm0 64a256 256 0 1 1 0-512 256 256 0 0 1 0 512zm320 320v-96a96 96 0 0 0-96-96H288a96 96 0 0 0-96 96v96a32 32 0 1 1-64 0v-96a160 160 0 0 1 160-160h448a160 160 0 0 1 160 160v96a32 32 0 1 1-64 0z">
                                                </path>
                                            </svg></i></div>
                                    <p >关于我们</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="gva-card-box">
                <div class="gva-card">
                    <div class="card-header"><span >数据统计</span></div>
                    <div class="echart-box">
                        <div class="el-row" style="margin-left: -10px; margin-right: -10px;">
                            <div class="el-col el-col-24 el-col-xs-24 el-col-sm-18 is-guttered">
                                <div class="dashboard-line-box">
                                <order-stat-charts></order-stat-charts>
                                </div>
                            </div>
                            <div class="el-col el-col-24 el-col-xs-24 el-col-sm-6 is-guttered"
                                style="padding-right: 10px; padding-left: 10px;">
                                <div class="commit-table">
                                    <div class="commit-table-title"> 更新日志 </div>
                                    <div class="log">
                                        <div class="log-item">
                                            <div class="flex-1 flex key-box"><span data-v-144ac47f=""
                                                    class="key top">1</span></div>
                                            <div class="flex-5 flex message">feat: update ci add
                                                CGO_ENABLED=0 (#1497)</div>
                                            <div class="flex-3 flex form">2023-08-04</div>
                                        </div>
                                        <div class="log-item">
                                            <div class="flex-1 flex key-box"><span data-v-144ac47f=""
                                                    class="key top">2</span></div>
                                            <div class="flex-5 flex message">集成tailwindcss 替换新的登陆页面和版权信息组件
                                                (#1499)

                                                * 集成tailwindcss

                                                * fix: 修改登录，init 页面

                                                * Update package.json

                                                * 升级可升级的第三方库到新版本

                                                * 细节调整

                                                ---------

                                                Co-authored-by: bypanghu &lt;bypanghu@163.com&gt;
                                                Co-authored-by: task &lt;121913992@qq.com&gt;</div>
                                            <div class="flex-3 flex form">2023-08-04</div>
                                        </div>
                                        <div class="log-item">
                                            <div class="flex-1 flex key-box"><span data-v-144ac47f=""
                                                    class="key top">3</span></div>
                                            <div class="flex-5 flex message">fix: macos和linux下代码定位命令不对 #1495
                                                (#1496)</div>
                                            <div class="flex-3 flex form">2023-08-02</div>
                                        </div>
                                        <div class="log-item">
                                            <div class="flex-1 flex key-box"><span data-v-144ac47f=""
                                                    class="key">4</span></div>
                                            <div class="flex-5 flex message">Rename outer.go to other.go
                                                (#1490)</div>
                                            <div class="flex-3 flex form">2023-08-02</div>
                                        </div>
                                        <div class="log-item">
                                            <div class="flex-1 flex key-box"><span data-v-144ac47f=""
                                                    class="key">5</span></div>
                                            <div class="flex-5 flex message">feat: use description to name
                                                apiGroup (#1494)</div>
                                            <div class="flex-3 flex form">2023-08-01</div>
                                        </div>
                                        <div class="log-item">
                                            <div class="flex-1 flex key-box"><span data-v-144ac47f=""
                                                    class="key">6</span></div>
                                            <div class="flex-5 flex message">Merge pull request #1483 from
                                                ChengDaqi2023/oscs_fix_cis9at8au51vj78hfkt0

                                                fix(sec): upgrade golang.org/x/image to 0.5.0</div>
                                            <div class="flex-3 flex form">2023-07-21</div>
                                        </div>
                                        <div class="log-item">
                                            <div class="flex-1 flex key-box"><span data-v-144ac47f=""
                                                    class="key">7</span></div>
                                            <div class="flex-5 flex message">update golang.org/x/image
                                                v0.0.0-20210220032944-ac19c3e999fb to 0.5.0</div>
                                            <div class="flex-3 flex form">2023-07-20</div>
                                        </div>
                                        <div class="log-item">
                                            <div class="flex-1 flex key-box"><span data-v-144ac47f=""
                                                    class="key">8</span></div>
                                            <div class="flex-5 flex message">修复marked问题</div>
                                            <div class="flex-3 flex form">2023-07-19</div>
                                        </div>
                                        <div class="log-item">
                                            <div class="flex-1 flex key-box"><span data-v-144ac47f=""
                                                    class="key">9</span></div>
                                            <div class="flex-5 flex message">增加多图片自动生成功能</div>
                                            <div class="flex-3 flex form">2023-07-18</div>
                                        </div>
                                        <div class="log-item">
                                            <div class="flex-1 flex key-box"><span data-v-144ac47f=""
                                                    class="key">10</span></div>
                                            <div class="flex-5 flex message">修复element2.3.8以上i18n的问题</div>
                                            <div class="flex-3 flex form">2023-07-17</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </SkeletonTemplate>
    </div>
</template>

<script setup>
import OrderStatCharts from './compoments/OrderStatCharts.vue';
import RelationState from './compoments/RelationState.vue';
import SkeletonTemplate from './compoments/SkeletonTemplate.vue';
</script> 

<style lang="scss" scoped>
</style>