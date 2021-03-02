import React from 'react'
import { Link } from 'react-router-dom';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import './styles.css'
export default function Paginator({ src, pages, page }) {
    let buttons = [];

    if (page <= 3 && pages <= 3) {
        for (let i = 1; i <= pages; i++) {
            if (i === Number(page)) {
                buttons.push(<Link to={`${src}${page}`} key={page} value={page} className="selected" disabled>{page}</Link>)
            } else {
                buttons.push(<Link to={`${src}${i}`} key={i} value={i}>{i}</Link>)
            }
        }
    } else {
        if (page <= 3 && pages > 3) {
            buttons = [];
            for (let i = 1; i <= 3; i++) {
                if (i === page * 1) {
                    buttons.push(<Link to={`${src}${page}`} key={page} value={page} className="selected" disabled>{page}</Link>)
                } else {
                    buttons.push(<Link to={`${src}${i}`} key={i} value={i}>{i}</Link>)
                }
            }
            buttons.push(<Link to="#" key="..." value="..." disabled>...</Link>);
            buttons.push(<Link to={`${src}${pages}`} key={pages} value={pages}>{pages}</Link>)
        } else {
            buttons = [];
            buttons.push(<Link to={`${src}1`} key="1" value="1">1</Link>)
            buttons.push(<Link to="#" key="...1" value="..." disabled>...</Link>);
            if (page * 1 + 1 < pages) {
                for (let i = page * 1 - 1; i <= page * 1 + 1; i++) {
                    if (i === page * 1) {
                        buttons.push(<Link to={`${src}${page}`} key={page} value={page} className="selected" disabled>{page}</Link>)
                    } else {
                        buttons.push(<Link to={`${src}${i}`} key={i} value={i}>{i}</Link>)
                    }
                }

                buttons.push(<Link to="#" key="...2" value="..." disabled>...</Link>);
                buttons.push(<Link to={`${src}${pages}`} key={pages} value={pages}>{pages}</Link>)
            } else {
                for (let i = page * 1 - 1; i <= pages; i++) {
                    if (i === page * 1) {
                        buttons.push(<Link to={`${src}${page}`} key={page} value={page} className="selected" disabled>{page}</Link>)
                    } else {
                        buttons.push(<Link to={`${src}${i}`} key={i} value={i}>{i}</Link>)
                    }
                }
            }
        }
    }
    if (pages > 1) {
        return (
            <form className="paginator-row">
                <Link to={`${src}${page * 1 - 1}`} className="control" value="-" ><FiChevronLeft size={30} /></Link>
                {buttons}
                <Link to={`${src}${page * 1 + 1}`} className="control" value="+" ><FiChevronRight size={30} /></Link>
            </form>
        )
    } else {
        return null
    }
}