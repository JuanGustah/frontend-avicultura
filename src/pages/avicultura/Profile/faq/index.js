import React, { useState, useEffect } from 'react';
import { FiPower, FiHelpCircle, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { useHistory } from 'react-router-dom'

import Collapsible from 'react-collapsible';

import './styles.css'
import api from '../../../../services/api';

export default function FAQ() {
    const [faqOpt, setFaqOpt] = useState('dashboard');
    const history = useHistory();

    useEffect(() => {
        document.title = "Perfil: FAQ - Avicultura"
    }, []);

    function logoff() {
        localStorage.clear();
        sessionStorage.clear();
        history.push('/');
    }
    return (
        <div className="faq-container">
            <div className="content">
                <header>
                    <h2>FAQ</h2>
                    <button onClick={logoff}>
                        <FiPower color={'#fff'} size={20} />
                    </button>
                </header>
                <div className="container">
                    <div className="header">
                        <div className="icon-bg">
                            <FiHelpCircle size={50} color={"#fff"} />
                        </div>
                        <h3>FAQ</h3>
                        <h4>Como podemos ajudá-lo?</h4>
                    </div>
                    <div className="options-row">
                        <input type="radio" name="faqOpt" id="faqOptDashboard"
                            value="dashboard"
                            onChange={e => setFaqOpt(e.target.value)}
                            checked={faqOpt === "dashboard"}
                        />
                        <label htmlFor="faqOptDashboard">Dashboard</label>
                        <input type="radio" name="faqOpt" id="faqOptLote"
                            value="lote"
                            onChange={e => setFaqOpt(e.target.value)}
                            checked={faqOpt === "lote"}
                        />
                        <label htmlFor="faqOptLote">Lote</label>
                        <input type="radio" name="faqOpt" id="faqOptOvos"
                            value="ovos"
                            onChange={e => setFaqOpt(e.target.value)}
                            checked={faqOpt === "ovos"}
                        />
                        <label htmlFor="faqOptOvos">Ovos</label>
                        <input type="radio" name="faqOpt" id="faqOptPerfil"
                            value="perfil"
                            onChange={e => setFaqOpt(e.target.value)}
                            checked={faqOpt === "perfil"}
                        />
                        <label htmlFor="faqOptPerfil">Perfil</label>
                    </div>
                </div>
                {faqOpt === "dashboard" ?
                    <div className="questions-list">
                        <Collapsible
                            trigger={<label className="trigger"><p>Não aparece nenhuma informação</p> <FiChevronDown size={20} color={"#11ADE8"} /></label>}
                            triggerWhenOpen={<label className="trigger"><p>Não aparece nenhuma informação </p> <FiChevronUp size={20} color={"#11ADE8"} /></label>}
                        >
                            <p>
                                Se é a primeira vez que você está utilizando, os resultados não aparecerão até você inserir um lote e posterioremente inserir ovos neste lote.
                                Caso não seja, contate-nos.
                            </p>
                        </Collapsible>
                        <Collapsible
                            trigger={<label className="trigger"><p>Preciso clicar no botão <strong>gerar</strong> toda vez?</p> <FiChevronDown size={20} color={"#11ADE8"} /></label>}
                            triggerWhenOpen={<label className="trigger"><p>Preciso clicar no botão <strong>gerar</strong> toda vez? </p> <FiChevronUp size={20} color={"#11ADE8"} /></label>}
                        >
                            <p>
                                Sim, o gráfico se manterá com as informações da última consulta até que você clique novamente no botão gerar.
                                Esta funcionalidade serve para evitar o gráfico ser gerado por um clique indesejado do usuário.
                            </p>
                        </Collapsible>
                        <Collapsible
                            trigger={<label className="trigger"><p>A opção semana se refere a 7 dias atrás ou do começo da semana?</p> <FiChevronDown size={20} color={"#11ADE8"} /></label>}
                            triggerWhenOpen={<label className="trigger"><p>A opção semana se refere a 7 dias atrás ou do começo da semana? </p> <FiChevronUp size={20} color={"#11ADE8"} /></label>}
                        >
                            <p>
                                O gráfico semanal é gerado através da data atual, sendo subtraídos 7 dias,
                                logo se você estiver gerando o gráfico na segunda o gráfico continuará
                                gerando até 7 dias de dados, caso nestes dias tenham sido inseridos ovos no sistema.
                            </p>
                        </Collapsible>
                        <Collapsible
                            trigger={<label className="trigger"><p>A opção ano se refere a 12 meses atrás ou do começo do ano?</p> <FiChevronDown size={20} color={"#11ADE8"} /></label>}
                            triggerWhenOpen={<label className="trigger"><p>A opção ano se refere a 12 meses atrás ou do começo do ano? </p> <FiChevronUp size={20} color={"#11ADE8"} /></label>}
                        >
                            <p>
                                Para evitar confusões de diferenças de anos comerciais,
                                o gráfico anual diferentemente do semanal é gerado de acordo
                                com o mês atual até o início do ano corrido. Caso esteja gerando
                                o gráfico em Janeiro, o gráfico só gerará de acordo com os dados
                                deste mês.
                            </p>
                        </Collapsible>
                    </div>
                    :
                    null
                }
                {faqOpt === "lote" ?
                    <div className="questions-list">
                        <Collapsible
                            trigger={<label className="trigger"><p>Para que cadastrar o lote?</p> <FiChevronDown size={20} color={"#11ADE8"} /></label>}
                            triggerWhenOpen={<label className="trigger"><p>Para que cadastrar o lote? </p> <FiChevronUp size={20} color={"#11ADE8"} /></label>}
                        >
                            <p>
                                Para se assemelhar a vida real, os ovos são inseridos no sistema de acordo com um lote da sua
                                granja. Portanto, antes de inserir um ovo,você precisa inserir um lote que sua granja possua.
                            </p>
                        </Collapsible>
                        <Collapsible
                            trigger={<label className="trigger"><p>No campo Galpão, ponho letras ou números?</p> <FiChevronDown size={20} color={"#11ADE8"} /></label>}
                            triggerWhenOpen={<label className="trigger"><p>No campo Galpão, ponho letras ou números? </p> <FiChevronUp size={20} color={"#11ADE8"} /></label>}
                        >
                            <p>
                                Para se aproximar do modelo real, este campo aceita apenas números.
                            </p>
                        </Collapsible>
                        <Collapsible
                            trigger={<label className="trigger"><p>No campo Lote, ponho letras ou números?</p> <FiChevronDown size={20} color={"#11ADE8"} /></label>}
                            triggerWhenOpen={<label className="trigger"><p>No campo Lote, ponho letras ou números? </p> <FiChevronUp size={20} color={"#11ADE8"} /></label>}
                        >
                            <p>
                                Para se aproximar do modelo real, este campo aceita apenas números.
                            </p>
                        </Collapsible>
                    </div>
                    :
                    null
                }
                {faqOpt === "ovos" ?
                    <div className="questions-list">
                        <Collapsible
                            trigger={<label className="trigger"><p>O que é a opção <strong>Por componente</strong>?</p> <FiChevronDown size={20} color={"#11ADE8"} /></label>}
                            triggerWhenOpen={<label className="trigger"><p>O que é a opção <strong>Por componente</strong>? </p> <FiChevronUp size={20} color={"#11ADE8"} /></label>}
                        >
                            <p>
                                Esta opção se refere a forma que você inserirá os ovos,
                                sendo inserido primeiro todos os valores dos albúmens dos ovos,
                                posteriormente todos os valores da gema e por fim todos os valores de gemas
                                e o sistema se responsabilizará em montar os ovos com todas as informações dada.
                            </p>
                        </Collapsible>
                        <Collapsible
                            trigger={<label className="trigger"><p>O que é a opção <strong>Por ovos</strong>?</p> <FiChevronDown size={20} color={"#11ADE8"} /></label>}
                            triggerWhenOpen={<label className="trigger"><p>O que é a opção <strong>Por ovos</strong>?</p> <FiChevronUp size={20} color={"#11ADE8"} /></label>}
                        >
                            <p>
                                Esta opção se refere a forma que você inserirá os ovos,
                                sendo inserido os valores de albúmen, gema e casca de um
                                único ovo e sendo assim inserido ovo a ovo, até que se
                                preencha as informações de todos os ovos
                            </p>
                        </Collapsible>
                        <Collapsible
                            trigger={<label className="trigger"><p>Inseri uma informação incorreta, o que eu faço?</p> <FiChevronDown size={20} color={"#11ADE8"} /></label>}
                            triggerWhenOpen={<label className="trigger"><p>Inseri uma informação incorreta, o que eu faço?</p> <FiChevronUp size={20} color={"#11ADE8"} /></label>}
                        >
                            <p>
                                Você pode em qualquer momento da inserção clicar na opção <strong>Visualizar</strong> que
                                lhe mostrará a lista de ovos ou componentes inseridos até aquele momento de forma enumerada,
                                com isso basta clicar em <strong>Detalhes / Editar</strong> para alterar o valor desejado desse ovo.
                                Ou caso prefira,você pode terminar a inserção das informações de todos os ovos e posterioremente alterar
                                alguma informação incorreta na listagem de ovos em seu perfil.
                            </p>
                        </Collapsible>
                        <Collapsible
                            trigger={<label className="trigger"><p>Inseri um valor de ovos mas precisarei inserir mais, o que eu faço?</p> <FiChevronDown size={20} color={"#11ADE8"} /></label>}
                            triggerWhenOpen={<label className="trigger"><p>Inseri um valor de ovos mas precisarei inserir mais, o que eu faço?</p> <FiChevronUp size={20} color={"#11ADE8"} /></label>}
                        >
                            <p>
                                Ao fim de todas as inserções, será possível inserir um novo componente
                                ou um novo ovo. Ao fazer isso o sistema entenderá que será analisado mais
                                um ovo durante a inserção. Caso seja necessário inserir mais de um ovo à contagem, repita o
                                processo até inserir todos os novos ovos que deseja analisar.
                            </p>
                        </Collapsible>
                    </div>
                    :
                    null
                }
                {faqOpt === "perfil" ?
                    <div className="questions-list">
                        <Collapsible
                            trigger={<label className="trigger"><p>O que vocês fazem com meus dados?</p> <FiChevronDown size={20} color={"#11ADE8"} /></label>}
                            triggerWhenOpen={<label className="trigger"><p>O  que vocês fazem com meus dados?</p> <FiChevronUp size={20} color={"#11ADE8"} /></label>}
                        >
                            <p>
                                Todas as informações coletadas pelo sistema AnalisaOvo são unica e exclusivamente utilizados para o funcionamento das mesma.
                                Nós não vendemos ou compartilhamos seus dados com terceiros e nos preocupamos com a segurança dos mesmo, por isso seus dados são criptografados
                                e apenas acessados pelo sistema.
                            </p>
                        </Collapsible>
                        <Collapsible
                            trigger={<label className="trigger"><p>Por quê não há opção para alterar e-mail e senha em editar perfil?</p> <FiChevronDown size={20} color={"#11ADE8"} /></label>}
                            triggerWhenOpen={<label className="trigger"><p>Por quê não há opção para alterar e-mail e senha em editar perfil?</p> <FiChevronUp size={20} color={"#11ADE8"} /></label>}
                        >
                            <p>
                                E-mail e senha são dados sensíveis que podem ser utilzados por pessoas maliciosas.
                                Por esta razão para alterar esses dados é necessário um processo específico
                                diferentemente do que ocorre em editar perfil.
                            </p>
                        </Collapsible>
                        <Collapsible
                            trigger={<label className="trigger"><p>O que é a <strong>inserção</strong> em listar ovos?</p> <FiChevronDown size={20} color={"#11ADE8"} /></label>}
                            triggerWhenOpen={<label className="trigger"><p>O que é a <strong>inserção</strong> em listar ovos?</p> <FiChevronUp size={20} color={"#11ADE8"} /></label>}
                        >
                            <p>
                                Durante o cadastro dos ovos, o sistema captura este momento e salva internamente para que possa ser
                                mais fácil de localizar o ovo que deseja buscar ou alterar informação, esta captura é a inserção.
                                Nele contém a data, o lote e a quantidade de ovos inseridas durante o cadastro.
                            </p>
                        </Collapsible>
                        <Collapsible
                            trigger={<label className="trigger"><p>Não achei minha dúvida neste FAQ, o que eu faço?</p> <FiChevronDown size={20} color={"#11ADE8"} /></label>}
                            triggerWhenOpen={<label className="trigger"><p>Não achei minha dúvida neste FAQ, o que eu faço?</p> <FiChevronUp size={20} color={"#11ADE8"} /></label>}
                        >
                            <p>
                                O FAQ é montado com as principais dúvidas que podem surgir no momento de utilizar o sistema,
                                caso você tenha um dúvida específica ou um bug / erro do sistema para relatar, contate-nos diretamente. :)
                            </p>
                        </Collapsible>
                    </div>
                    :
                    null
                }
            </div>
        </div>
    )
}