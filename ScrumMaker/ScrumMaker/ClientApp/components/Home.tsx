import * as React from 'react';
import { RouteComponentProps } from 'react-router';

export class Home extends React.Component<RouteComponentProps<{}>, {}> {
    public render() {
        return <div>
            <section id="banner">
                <video id="bgVideo" controls preload="true" autoPlay loop muted>
                    <source src="./img/banner.mp4" type="video/mp4" />
                    <source src="./img/banner.webm" type="video/webm" />
                </video>
                <div className="inner">
                    <header>
                        <h1>ScrumMaker</h1>
                    </header>
                    <a href="#main" className="more">Learn More</a>
                </div>
            </section>
            <div id="main">
                <div className="inner">
                    <div className="thumbnails">
                        <div className="box">
                            <a href="https://www.youtube.com/watch?v=D8vT7G0WATM&list=PLF6BFA8BAEDF6CE70&index=1" className="image fit"><img src="./img/pic01.jpg" alt="" /></a>
                            <div className="inner">
                                <h3>Introduction to Scrum</h3>
                                <p>A quick, animated overview of Scrum. This video covers the rationale and essentials of Scrum and Agile, and includes an overview of the roles, meetings.</p>
                                <a href="https://www.youtube.com/watch?v=D8vT7G0WATM&list=PLF6BFA8BAEDF6CE70&index=1"  className="button fit" data-poptrox="youtube,800x400">Watch</a>
                            </div>
                        </div>
                        <div className="box">
                            <a href="https://www.youtube.com/watch?v=b_WeHcZcx1w&list=PLF6BFA8BAEDF6CE70&index=2" className="image fit"><img src="./img/pic02.jpg" alt="" /></a>
                            <div className="inner">
                                <h3>Backlog Refinement Meeting</h3>
                                <p>This module covers the hidden fifth meeting that's essential to success at Scrum and other Agile approaches.</p>
                                <a href="https://www.youtube.com/watch?v=b_WeHcZcx1w&list=PLF6BFA8BAEDF6CE70&index=2" className="button style2 fit" data-poptrox="youtube,800x400">Watch</a>
                            </div>
                        </div>
                        <div className="box">
                            <a href="https://www.youtube.com/watch?v=wPvG9NZNUa4&list=PLF6BFA8BAEDF6CE70&index=3" className="image fit"><img src="./img/pic03.jpg" alt="" /></a>
                            <div className="inner">
                                <h3>Sprint Planning Meeting</h3>
                                <p>This module covers the first official meeting in the Scrum cycle. Subtopics include the difference between the Product Backlog vs. the Sprint Backlog. </p>
                                <a href="https://www.youtube.com/watch?v=wPvG9NZNUa4&list=PLF6BFA8BAEDF6CE70&index=3" className="button style3 fit" data-poptrox="youtube,800x400">Watch</a>
                            </div>
                        </div>
                        <div className="box">
                            <a href="https://www.youtube.com/watch?v=G4_oHZbURgU&list=PLF6BFA8BAEDF6CE70&index=4" className="image fit"><img src="./img/pic04.jpg" alt="" /></a>
                            <div className="inner">
                                <h3>Daily Scrum Meeting</h3>
                                <p>The module briefly touches on the Agile engineering practices of Test Driven Development (TDD), pair programming, refactoring, and continuous integration. &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </p>
                                <a href="https://www.youtube.com/watch?v=G4_oHZbURgU&list=PLF6BFA8BAEDF6CE70&index=4" className="button style2 fit" data-poptrox="youtube,800x400">Watch</a>
                            </div>
                        </div>
                        <div className="box">
                            <a href="https://www.youtube.com/watch?v=cbJinz6TieI&index=5&list=PLF6BFA8BAEDF6CE70" className="image fit"><img src="./img/pic05.jpg" alt="" /></a>
                            <div className="inner">
                                <h3>Sprint Review Meeting </h3>
                                <p>This module covers the meeting held after the execution of each Sprint in which the team conducts a live demonstration of the working product increment for the Product Owner. </p>
                                <a href="https://www.youtube.com/watch?v=cbJinz6TieI&index=5&list=PLF6BFA8BAEDF6CE70" className="button style3 fit" data-poptrox="youtube,800x400">Watch</a>
                            </div>
                        </div>
                        <div className="box">
                            <a href="https://www.youtube.com/watch?v=rZ8I0ATrauM&list=PLF6BFA8BAEDF6CE70&index=6" className="image fit"><img src="./img/pic06.jpg" alt="" /></a>
                            <div className="inner">
                                <h3>Sprint Retrospective Meeting</h3>
                                <p>This module covers the final meeting associated with each Sprint. In this meeting, the team reflects on the Sprint to raise its own awareness.</p>
                                <a href="https://www.youtube.com/watch?v=rZ8I0ATrauM&list=PLF6BFA8BAEDF6CE70&index=6" className="button fit" data-poptrox="youtube,800x400">Watch</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <footer id="footer">

                <ul className="icons">
                    <li><a href="https://www.youtube.com/user/Scrumorg/videos" className="icon fa-youtube"><span className="label">Youtube</span></a></li>
                    <li><a href="https://www.facebook.com/scrumalliance/" className="icon fa-facebook"><span className="label">Facebook</span></a></li>
                    <li><a href="https://www.instagram.com/pashechk0" className="icon fa-instagram"><span className="label">Instagram</span></a></li>
                    <li><a href="kolert@mail.ru" className="icon fa-envelope"><span className="label">Email</span></a></li>
                </ul>
            </footer>
        </div>;
    }
}
