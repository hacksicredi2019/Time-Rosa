import requests, json
import pandas as pd

url = 'http://172.22.239.62:3333/school'
tipo_instituicao = {1:'publica', 2:'publica', 3:'publica', 4:'privada'}

cidade = 'Porto Alegre'
estado = 'Rio Grande do Sul'

cod_porto = 4314902

dict_series = {
    1:'educacao_infantil_creche',
    2:'educacao_infantil_pre_escola',
    14:'ensino_fundamental_1_ano',
    15:'ensino_fundamental_2_ano',
    16:'ensino_fundamental_3_ano',
    17:'ensino_fundamental_4_ano',
    18:'ensino_fundamental_5_ano',
    19:'ensino_fundamental_6_ano',
    20:'ensino_fundamental_7_ano',
    21:'ensino_fundamental_8_ano',
    41:'ensino_fundamental_9_ano',
    25:'ensino_medio_1_serie',
    26:'ensino_medio_2_serie',
    27:'ensino_medio_3_serie',
    28:'ensino_medio_4_serie'
}

escolas = pd.read_csv('NewEscola.csv', sep=',', usecols=['CO_ENTIDADE', 'NO_ENTIDADE', 'TP_DEPENDENCIA','IN_LABORATORIO_INFORMATICA', 'IN_LABORATORIO_CIENCIAS', 'IN_QUADRA_ESPORTES','IN_BIBLIOTECA_SALA_LEITURA','IN_PARQUE_INFANTIL','IN_BERCARIO','IN_BANHEIRO_PNE','IN_DEPENDENCIAS_PNE','IN_BANHEIRO_CHUVEIRO','IN_REFEITORIO','IN_AUDITORIO','IN_ALOJAM_ALUNO','IN_LAVANDERIA','IN_INTERNET','IN_ALIMENTACAO','TP_ATIVIDADE_COMPLEMENTAR','IN_EDUCACAO_INDIGENA','IN_FINAL_SEMANA'
], encoding='Latin-1')

enderecos = pd.read_csv('dados_endereco.csv', sep=',', encoding='Latin-1', usecols=['CO_CEP', 'NO_BAIRRO', 'CO_ENTIDADE', 'CO_MUNICIPIO', 'NU_DDD', 'NU_TELEFONE', 'new_latitude','new_longitude'])

dados_lixo = pd.read_csv('ESCOLAS_POA_2018.csv', sep='|', usecols=['IN_LIXO_RECICLA', 'CO_ENTIDADE', 'CO_MUNICIPIO'], encoding='cp1252')

series = pd.read_csv('MATRICULAS_POA_2018_Estruturado.csv', sep=';', encoding='Latin-1', usecols=['CO_MUNICIPIO', 'TP_ETAPA_ENSINO', 'CO_ENTIDADE']
)

series_poa = series[series['CO_MUNICIPIO'] == cod_porto]

reciclagem_poa = dados_lixo[dados_lixo['CO_MUNICIPIO'] == cod_porto]

enderecos_poa = enderecos[enderecos['CO_MUNICIPIO'] == cod_porto] 

for i in escolas.index:
	series_escola = []
	series_dessa_escola = series_poa[series_poa['CO_ENTIDADE'] == escolas['CO_ENTIDADE'][i]]
	for j in enderecos_poa.index:
		if enderecos_poa['CO_ENTIDADE'][j] == escolas['CO_ENTIDADE'][i]:
			endereco = enderecos_poa['NO_BAIRRO'][j]
			telefone = f"{enderecos_poa['NU_DDD'][j]}{enderecos_poa['NU_TELEFONE'][j]}"
			cep = enderecos_poa['CO_CEP'][j]
			latitude = enderecos_poa['new_latitude'][j]
			longitude = enderecos_poa['new_longitude'][j]
			
			for k in reciclagem_poa.index:
				if reciclagem_poa['CO_ENTIDADE'][k] == escolas['CO_ENTIDADE'][i]:
					reciclagem = reciclagem_poa['IN_LIXO_RECICLA'][k]
			
	anos_escola = series_dessa_escola.TP_ETAPA_ENSINO.unique()

	for l in dict_series:
		if l in anos_escola:
			series_escola.append(dict_series[l])
	
	if len(series_escola) <= 0:
		continue

	if not latitude or latitude == 'NÃ£o encontrado':
		continue

	if not longitude or longitude == 'NÃ£o encontrado':
		continue

	params = {
		'name':escolas['NO_ENTIDADE'][i],
		'thumbmail':f'image{i}.png',
		'type':tipo_instituicao[escolas['TP_DEPENDENCIA'][i]],
		'state':estado,
		'city':cidade,
		'district':endereco,
		'telefone':telefone,
		'lab_informatica':bool(escolas['IN_LABORATORIO_INFORMATICA'][i]),
		'lab_ciencia':bool(escolas['IN_LABORATORIO_CIENCIAS'][i]),
		'quadra_esportes':bool(escolas['IN_QUADRA_ESPORTES'][i]),
		'biblioteca':bool(escolas['IN_BIBLIOTECA_SALA_LEITURA'][i]),
		'parque_infantil':bool(escolas['IN_PARQUE_INFANTIL'][i]),
		'bercario':bool(escolas['IN_BERCARIO'][i]),
		'banheiro_pne':bool(escolas['IN_BANHEIRO_PNE'][i]),
		'dependencia_pne':bool(escolas['IN_DEPENDENCIAS_PNE'][i]),
		'banheiro_chuveiro':bool(escolas['IN_BANHEIRO_CHUVEIRO'][i]),
		'refeitorio':bool(escolas['IN_REFEITORIO'][i]),
		'auditorio':bool(escolas['IN_AUDITORIO'][i]),
		'alojamento_aluno':bool(escolas['IN_ALOJAM_ALUNO'][i]),
		'lavanderia':bool(escolas['IN_LAVANDERIA'][i]),
		'internet':bool(escolas['IN_INTERNET'][i]),
		'alimentacao':bool(escolas['IN_ALIMENTACAO'][i]),
		'atividade_complementar':bool(escolas['TP_ATIVIDADE_COMPLEMENTAR'][i]),
		'educacao_indigena':bool(escolas['IN_EDUCACAO_INDIGENA'][i]),
		'final_semana':bool(escolas['IN_FINAL_SEMANA'][i]),
		'cep':cep,
		'latitude':latitude,
		'longitude':longitude,
		'reciclagem':bool(reciclagem),
		'series':series_escola
	}
	print(params)

	try:
		headers = {'content-type': 'application/json'}
		r = requests.post(url, data=json.dumps(params), headers=headers)
	except Exception as e:
		print(e)
	
	print(r.json())


	if i >= 50:
		break

	