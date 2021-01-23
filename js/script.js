'use strict';
/*
document.getElementById('test-button').addEventListener('click', function(){
const links = document.querySelectorAll('.titles a');
console.log('links:', links);
});
*/

const titleClickHandler = function(event) {
  event.preventDefault();
  const clickedElement = this;
  console.log('Link was clicked!');
  // console.log(event)

  /* [DONE]  remove class 'active' from all article links */

  const activeLinks = document.querySelectorAll('.titles a.active');

  for (let activeLink of activeLinks) {
    activeLink.classList.remove('active');
  }

  /* [DONE] add class 'active' to the clicked link */

  // console.log('clickedElement:', clickedElement);
  clickedElement.classList.add('active');

  /* [DONE] remove class 'active' from all articles */

  const activeArticles = document.querySelectorAll('.posts article.active');

  for (let activeArticle of activeArticles) {
    activeArticle.classList.remove('active');
  }

  /* [DONE] get 'href' attribute from the clicked link */

  const articleSelector = clickedElement.getAttribute('href');
  console.log('href:', articleSelector);

  /* [DONE] find the correct article using the selector (value of 'href' attribute) */

  const targetArticle = document.querySelector(articleSelector);
  console.log('target:', targetArticle);

  /* [DONE] add class 'active' to the correct article */

  targetArticle.classList.add('active');
};

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optArticleAuthorSelector = '.post-author';

function generateTitleLinks(customSelector = '') {

  /* [DONE] remove contents of titleList */

  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';

  /* [DONE] for each article */

  const articles = document.querySelectorAll(optArticleSelector + customSelector);

  let html = '';

  for (let article of articles) {

    /* [DONE] get the article id */

    const articleId = article.getAttribute('id');

    /* [DONE] find the title element */
    /* [DONE] get the title from the title element */

    const articleTitle = article.querySelector(optTitleSelector).innerHTML;

    /* [DONE] create HTML of the link */

    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    //console.log('linkHTML: ', linkHTML);

    /* [DONE] insert link into titleList */

    html = html + linkHTML;
    //console.log(html);
  }

  titleList.innerHTML = html;

  const links = document.querySelectorAll('.titles a');
  //console.log('links: ', links);
  for(let link of links) {
    link.addEventListener('click', titleClickHandler);
  }
}

generateTitleLinks();

function generateTags() {
  /* [DONE] find all articles */

  const articles = document.querySelectorAll(optArticleSelector);

  /* [DONE] START LOOP: for every article: */

  for (let article of articles) {

    /* [DONE] find tags wrapper */

    const tagsWrapper = article.querySelector(optArticleTagsSelector);

    /* [DONE] make html variable with empty string */

    let html = '';

    /* [DONE] get tags from data-tags attribute */

    const articleTags = article.getAttribute('data-tags');
    //console.log(articleTags);

    /* [DONE] split tags into array */

    const articleTagsArray = articleTags.split(' ');
    //console.log(articleTagsArray);

    /* [DONE] START LOOP: for each tag */

    for (let tag of articleTagsArray) {
      //console.log(tag);

      /* [DONE] generate HTML of the link */

      const linkHTML = '<li><a href="#tag-' + tag + '"><span>' + tag + '</span></a></li>';
      //console.log(linkHTML);

      /* [DONE] add generated code to html variable */

      html = html + linkHTML;
      //console.log(html);

    /* [DONE] END LOOP: for each tag */
    }

    /* [DONE?] insert HTML of all the links into the tags wrapper */

    tagsWrapper.innerHTML = html;  // ????? czemu brak odstępów między tagami pod artykułem???????


  /* [DONE] END LOOP: for every article: */
  }
}

generateTags();

function tagClickHandler(event){

  /* [DONE] prevent default action for this event */

  event.preventDefault();

  /* [DONE] make new constant named "clickedElement" and give it the value of "this" */

  const clickedElement = this;

  /* [DONE] make a new constant "href" and read the attribute "href" of the clicked element */

  const href = clickedElement.getAttribute('href');

  /* [DONE] make a new constant "tag" and extract tag from the "href" constant */

  const tag = href.replace('#tag-', '');

  /* [DONE] find all tag links with class active */

  const activeTags = document.querySelectorAll('a.active[href^="#tag-"]');

  /* [DONE] START LOOP: for each active tag link */

  for (let activeTag of activeTags) {

    /* [DONE] remove class active */

    activeTag.classList.remove('active');

    /* [DONE] END LOOP: for each active tag link */

  }

  /* [DONE] find all tag links with "href" attribute equal to the "href" constant */

  const foundTagLinks = document.querySelectorAll('a[href="' + href + '"]');

  /* [DONE] START LOOP: for each found tag link */

  for (let foundTagLink of foundTagLinks ) {

    /* [DONE] add class active */

    foundTagLink.classList.add('active');

    /* [DONE] END LOOP: for each found tag link */

  }

  /* [DONE] execute function "generateTitleLinks" with article selector as argument */

  generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags(){

  /* [DONE] find all links to tags */

  const tagLinks = document.querySelectorAll('a[href^="#tag-"]');

  /* [DONE] START LOOP: for each link */

  for (let tagLink of tagLinks) {

    /* [DONE] add tagClickHandler as event listener for that link */

    tagLink.addEventListener('click', tagClickHandler);

    /* [DONE] END LOOP: for each link */

  }
}

addClickListenersToTags();

function generateAuthors() {

  /* [DONE] find all articles */

  const articles = document.querySelectorAll(optArticleSelector);

  /* [DONE] START LOOP: for every author: */

  for (let article of articles) {

    /* find author wrapper */

    const authorWrapper = article.querySelector(optArticleAuthorSelector);

    /*  make html variable with empty string */

    let html = '';

    /* get authors from data-authors attribute */

    const articleAuthors = article.getAttribute('data-author');
    //console.log(articleAuthors);

    /* [DONE] generate HTML of the link */

    const linkHTML = '<li><a href="#author-' + articleAuthors + '"><span>' + articleAuthors + '</span></a></li>';

    /* [DONE] add generated code to html variable */

    html = html + linkHTML;

    /* insert HTML of all the links into the tag wrapper */

    authorWrapper.innerHTML = html;
  }
}

generateAuthors();

function authorClickHandler(event) {

  /* [DONE] prevent default action for this event */

  event.preventDefault();

  /* [DONE] make new constant named "clickedElement" and give it the value of "this" */

  const clickedElement = this;

  /* [DONE] make a new constant "href" and read the attribute "href" of the clicked element */

  const href = clickedElement.getAttribute('href');

  /* [DONE] make a new constant "tag" and extract tag from the "href" constant */

  const tag = href.replace('#author-', '');

  /* [DONE] find all author links with class active */

  const activeLinks = document.querySelectorAll('a.active[href^="#author-"]');


  /* [DONE] START LOOP: for each active author link */

  for (let activeLink of activeLinks) {

    /* [DONE] remove class active */

    activeLink.classList.remove('active');

    /* [DONE] END LOOP: for each active tag link */

  }

  /* [DONE] find all tag links with "href" attribute equal to the "href" constant */

  const foundAuthorLinks = document.querySelectorAll('a[href="' + href + '"]');
  console.log(foundAuthorLinks);

  /* [DONE] START LOOP: for each found tag link */

  for (let foundAuthorLink of foundAuthorLinks) {

    /* [DONE] add class active */

    foundAuthorLink.classList.add('active');

    /* [DONE] END LOOP: for each found tag link */

  }

  /* [DONE] execute function "generateTitleLinks" with article selector as argument */

  generateTitleLinks('[data-author="' + tag + '"]');
}

function addClickListenersToAuthors () {

  /* [DONE] find all links to authors */

  const authorLinks = document.querySelectorAll('a[href^="#author-"]');

  /* [DONE] START LOOP: for each link */

  for (let authorLink of authorLinks) {

    /* [DONE] add authorClickHandler as event listener for that link */

    authorLink.addEventListener('click', authorClickHandler);

    /* [DONE] END LOOP: for each link */

  }
}

addClickListenersToAuthors ();

