import { Component, OnInit } from '@angular/core';

interface ILogo {
  name: string;
  src: string;
  link: string;
  tooltip: string;
}

@Component({
  selector: 'app-logo-bar',
  templateUrl: './logo-bar.component.html',
  styleUrls: ['./logo-bar.component.scss']
})
export class LogoBarComponent implements OnInit {

  url = 'https://s3-cv-creator-bucket.s3.eu-central-1.amazonaws.com/images/logos/';

  logos: ILogo[] = [
    {
      name: 'Angular',
      src: 'angular.png',
      link: 'https://angular.io/',
      tooltip: 'One framework. Mobile & desktop.'
    },
    {
      name: 'NgRx',
      src: 'ngrx.png',
      link: 'https://ngrx.io/',
      tooltip: 'Reactive State for Angular.'
    },
    {
      name: 'Bootstrap',
      src: 'bootstrap.png',
      link: 'https://ng-bootstrap.github.io/#/home',
      tooltip: 'Angular widgets built from the ground up using only Bootstrap 4 CSS with APIs designed for the Angular ecosystem.'
    },
    {
      name: 'Sass',
      src: 'sass.png',
      link: 'https://sass-lang.com/',
      tooltip: 'Sass is the most mature, stable, and powerful professional grade CSS extension language in the world.'
    },
    {
      name: 'Cypress',
      src: 'cypress.png',
      link: 'https://cypress.io/',
      tooltip: 'Fast, easy and reliable testing for anything that runs in a browser.'
    },
    {
      name: 'Spring Boot',
      src: 'spring-boot.png',
      link: 'https://spring.io/projects/spring-boot',
      tooltip: 'Spring Boot makes it easy to create stand-alone, production-grade Spring based Applications that you can "just run".'
    },
    {
      name: 'Maven',
      src: 'maven.png',
      link: 'https://maven.apache.org/',
      tooltip: 'Apache Maven is a software project management and comprehension tool.'
    },
    {
      name: 'Docker',
      src: 'docker.png',
      link: 'https://www.docker.com/',
      tooltip: 'Docker: The Modern Platform for High-Velocity Innovation.'
    },
    {
      name: 'Gitlab',
      src: 'gitlab.png',
      link: 'https://www.gitlab.com/',
      tooltip: 'GitLab is a complete DevOps platform. Spend less time on your ' +
        'toolchain and more time on what matters: releasing great software.'
    },
    {
      name: 'Gitlab CI',
      src: 'gitlab-ci.png',
      link: 'https://www.gitlab-ci.com/',
      tooltip: 'GitLab CI/CD pipelines build, test, deploy, and monitor your code as part of a single, integrated workflow.'
    },
    {
      name: 'Heroku',
      src: 'heroku.png',
      link: 'https://www.heroku.com/',
      tooltip: 'Develop and run apps using these Heroku Products.'
    },
    {
      name: 'Kubernetes',
      src: 'kubernetes.png',
      link: 'https://www.kubernetes.io/',
      tooltip: 'Kubernetes (K8s) is an open-source system for automating deployment, scaling, and management of containerized applications.'
    },
    {
      name: 'AWS S3',
      src: 's3.png',
      link: 'https://aws.amazon.com/s3/',
      tooltip: 'Amazon Simple Storage Service (Amazon S3) is an object storage service ' +
        'that offers industry-leading scalability, data availability, security, and performance.'
    },
    {
      name: 'AWS RDS',
      src: 'rds.png',
      link: 'https://aws.amazon.com/rds/',
      tooltip: 'Amazon Relational Database Service (Amazon RDS) makes it easy to set up, ' +
        'operate, and scale a relational database in the cloud.'
    },
    {
      name: 'Project Lombock',
      src: 'lombock.png',
      link: 'https://projectlombok.org',
      tooltip: 'Project Lombok is a java library that automatically plugs into your editor and build tools, spicing up your java.'
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
