from flask import Flask , jsonify , json , Response,send_file,render_template
from flask import request
from pandas.core.frame import DataFrame
from flask_restless import APIManager
from flask_cors import CORS
from sklearn.ensemble import ExtraTreesRegressor
import pandas as pd
import numpy as np
import seaborn as sns
import matplotlib.pyplot as plt
import matplotlib.image as mpimg

import folium
import math
import plotly.graph_objects as go
import plotly.express as px
import eli5
import graphviz
import networkx as nx
import io
import base64
from matplotlib.backends.backend_agg import FigureCanvasAgg as FigureCanvas
from matplotlib.figure import Figure
from eli5.sklearn import PermutationImportance
from folium import Choropleth, Circle, Marker
from folium.plugins import HeatMap, MarkerCluster
from sklearn.ensemble import RandomForestRegressor
from sklearn.tree import DecisionTreeRegressor
from sklearn.ensemble import ExtraTreesRegressor
from xgboost import XGBRegressor
from sklearn.metrics import mean_absolute_error,r2_score
from sklearn.model_selection import train_test_split
from geopy.geocoders import Nominatim
from sklearn import tree
from matplotlib import pyplot as plt
from string import ascii_letters
from colorama import Fore, Back, Style

app = Flask(__name__,static_url_path='',static_folder='templates/',template_folder = 'templates')
CORS(app)


custom_colors = ["#4e89ae", "#c56183","#ed6663","#ffa372"]
customPalette = sns.set_palette(sns.color_palette(custom_colors))

mumbai = sns.dark_palette(custom_colors[0], reverse=True)
sns.palplot(sns.color_palette(mumbai),size=1)
plt.tick_params(axis='both', labelsize=0, length = 0)

delhi = sns.dark_palette(custom_colors[1], reverse=True)
sns.palplot(sns.color_palette(delhi),size=1)
plt.tick_params(axis='both', labelsize=0, length = 0)

chennai = sns.dark_palette(custom_colors[2], reverse=True)
sns.palplot(sns.color_palette(chennai),size=1)
plt.tick_params(axis='both', labelsize=0, length = 0)

hyderabad = sns.dark_palette(custom_colors[3], reverse=True)
sns.palplot(sns.color_palette(hyderabad),size=1)

df1 = pd.read_csv('./dataset/updated/Mumbai_updated.csv')
df2 = pd.read_csv('./dataset/updated/Delhi_updated.csv')
df3 = pd.read_csv('./dataset/updated/Chennai_updated.csv')
df4 = pd.read_csv('./dataset/updated/Hyderabad_updated.csv')
df1['Price'] = df1['Price']/100000
df2['Price'] = df2['Price']/100000
df3['Price'] = df3['Price']/100000
df4['Price'] = df4['Price']/100000

frames = [df1,df2,df3,df4]
merged = pd.concat(frames)
merged.columns
merged = merged.rename(columns={"Children'splayarea": "ChildrenPlayArea"})
merged = merged.dropna()

feature_names = ['Area','No. of Bedrooms',
      'MaintenanceStaff',
      '24X7Security', 'Latitude',
      'Longitude']

X = merged[feature_names]
y = merged['Price']

train_X, val_X, train_y, val_y = train_test_split(X, y,test_size=0.2, random_state=1)

x_test=[[379,1,0,0,12.92,80.19]]

class TrainModel:
    def __init__(self,model,name):
        self.model = model
        self.model.fit(X=train_X, y=train_y)
        predictions = model.predict(val_X)
        mae = mean_absolute_error(val_y, predictions)
        r2 = r2_score(val_y, predictions)
        print("{0} accracy {1}".format(name,r2))
    
    def predict(self,value):
        return self.model.predict(value)

   
class Graph:
    def box_plot(self,x, title,c):
        fig, ax = plt.subplots(1,1,figsize=(20,10),sharex=True)
        sns.boxplot(x, ax=ax,color=c)
        ax.set(xlabel=None)
        ax.set_title('Boxplot')
        return fig

    def double_plot(self,x, title,c):
        fig, ax = plt.subplots(1,1,figsize=(20,10),sharex=True)
        sns.distplot(x, ax=ax,color=c)
        ax.set(xlabel=None)
        ax.set_title('Histogram')
        return fig

    def count_plot(self,data,title,p):
        df5=data[data['Resale']== 0]
        df6=data[data['Resale']== 1]
        fig, ax = plt.subplots(1,2,figsize=(15, 10))
        ax[0]=sns.countplot(y='Location', data=df5, order=df5.Location.value_counts().index[:10],ax=ax[0],palette = p)
        ax[0].set_title('Number of New Properties')
        ax[1]=sns.countplot(y='Location', data=df6, order=df6.Location.value_counts().index[:10],ax=ax[1],palette = p)
        ax[1].set_title('Number of Resale Properties')  
        return fig


    def scatter_plot(self,data,title,c):
        fig,ax = plt.subplots(1,1,figsize=(15,20))
        ax = sns.scatterplot(x="Area", y="Price", data=data,color=c,marker="P")
        return fig




@app.route('/')
def home():
    return render_template('index.html')


@app.route('/analysis')
def getAnalysis():
    return render_template('analysis.html')

@app.route('/mumbai')
def getMumbai():
    return render_template('mumbai.html')

@app.route('/delhi')
def getDelhi():
    return render_template('delhi.html')

@app.route('/hyderabad')
def getHyderabad():
    return render_template('hyderabad.html')

@app.route('/chennai')
def getChennai():
    return render_template('chennai.html')

@app.route('/predict', methods=['POST'])   
def index():
    data = request.get_json()
    area = data['area']
    bedroomCount = data['bedroomCount']
    maintenanceStaff = data['maintenanceStaff']
    security = data['security']
    latitude = data['latitude']
    longitude = data['longitude']
    print("----------------")
    print(area)
    #print(request.json)

    model3 = TrainModel(ExtraTreesRegressor(),"ExtraTrees Regressor")
    price = model3.predict([[area,bedroomCount,maintenanceStaff,security,latitude,longitude ]])
    #price = model3.predict([[200,1,0,0,80.3,12.3]])
   
    data = {
        'price'  : price[0],
    }
    js = json.dumps(data)
    response = Response(js, status=200, mimetype='application/json')
    response.headers['Access-Control-Allow-Origin'] = "http://localhost:4200"
    response.headers['Access-Control-Allow-Credentials'] = 'true'
    return response

@app.route('/topPredict', methods=['POST'])
def topPredict():
    data = request.get_json()
    pArea = 500
    pBedroomCount = 0
    pMaintenanceStaff = 0
    pSecurity = 0
    pLatitude = 12.0
    pLongitude = 80.0
    topData = merged
    topData.query('Area < ({0} + 500) and Area >({0} -500) '.format(pArea),inplace = True)
    topData.query('MaintenanceStaff == {0}'.format(pMaintenanceStaff),inplace = True )
    topData.query('Latitude > ({0}-10) and Latitude <({0}+10)'.format(pLatitude),inplace = True )
    topData.query('Longitude > ({0}-10) and Longitude <({0}+10)'.format(pLongitude),inplace = True )
    resultData = topData[['Location','Area','Price']].head(n=10)
    resultData = resultData.reset_index(drop=True)
    topData = {
        'data' : resultData.to_json(),
    }

    df=DataFrame.to_dict(resultData)
    js = json.dumps(topData)
    
    return df


@app.route('/mumbaiDoublePlot', methods=['GET'])   
def mumbaiDoublePlot(): 
    graphObject = Graph() 
    # if name == "mumbai"
    fig = graphObject.double_plot(df2['Price'],'Distribution of Price(in lakhs) in Delhi',custom_colors[1])
    canvas = FigureCanvas(fig)
    img = io.BytesIO()
    fig.savefig(img)
    img.seek(0)
    return send_file(img,mimetype='img/png')

@app.route('/mumbaiBoxPlot', methods=['GET'])   
def mumbaiBoxPlot(): 
    graphObject = Graph() 
    # if name == "mumbai"
    fig = graphObject.box_plot(df2['Price'],'Distribution of Price(in lakhs) in Delhi',custom_colors[1])
    canvas = FigureCanvas(fig)
    img = io.BytesIO()
    fig.savefig(img)
    img.seek(0)
    return send_file(img,mimetype='img/png')

@app.route('/mumbaiCountPlot', methods=['GET'])   
def mumbaiCountPlot(): 
    graphObject = Graph() 
    # if name == "mumbai"
    fig = graphObject.count_plot(df1,'New and Resale Properties in Mumbai',mumbai)
    canvas = FigureCanvas(fig)
    img = io.BytesIO()
    fig.savefig(img)
    img.seek(0)
    return send_file(img,mimetype='img/png')


@app.route('/mumbaiScatterPlot', methods=['GET'])  
def mumbaiScatterPlot():
    graphObject =Graph()
    fig=graphObject.scatter_plot(df1,'Mumbai',custom_colors[0])
    canvas = FigureCanvas(fig)
    img = io.BytesIO()
    fig.savefig(img)
    img.seek(0)
    return send_file(img,mimetype='img/png')


@app.route('/chennaiDoublePlot', methods=['GET'])   
def chennaiDoublePlot(): 
    graphObject = Graph() 
    # if name == "mumbai"
    fig = graphObject.double_plot(df3['Price'],'Distribution of Price(in lakhs) in Chennai',custom_colors[2])
    canvas = FigureCanvas(fig)
    img = io.BytesIO()
    fig.savefig(img)
    img.seek(0)
    return send_file(img,mimetype='img/png')

@app.route('/chennaiBoxPlot', methods=['GET'])   
def chennaiBoxPlot(): 
    graphObject = Graph() 
    # if name == "mumbai"
    fig = graphObject.box_plot(df3['Price'],'Distribution of Price(in lakhs) in Chennai',custom_colors[2])
    canvas = FigureCanvas(fig)
    img = io.BytesIO()
    fig.savefig(img)
    img.seek(0)
    return send_file(img,mimetype='img/png')

@app.route('/chennaiCountPlot', methods=['GET'])   
def chennaiCountPlot(): 
    graphObject = Graph() 
    # if name == "mumbai"
    fig = graphObject.count_plot(df3,'New and Resale Properties in Chennai',chennai)
    canvas = FigureCanvas(fig)
    img = io.BytesIO()
    fig.savefig(img)
    img.seek(0)
    return send_file(img,mimetype='img/png')


@app.route('/chennaiScatterPlot', methods=['GET'])  
def chennaiScatterPlot():
    graphObject =Graph()
    fig=graphObject.scatter_plot(df3,'Chennai',custom_colors[2])
    canvas = FigureCanvas(fig)
    img = io.BytesIO()
    fig.savefig(img)
    img.seek(0)
    return send_file(img,mimetype='img/png')


@app.route('/hyderabadDoublePlot', methods=['GET'])   
def hyderabadDoublePlot(): 
    graphObject = Graph() 
    # if name == "mumbai"
    fig = graphObject.double_plot(df4['Price'],'Distribution of Price(in lakhs) in Hyderabad',custom_colors[3])
    canvas = FigureCanvas(fig)
    img = io.BytesIO()
    fig.savefig(img)
    img.seek(0)
    return send_file(img,mimetype='img/png')

@app.route('/hyderabadBoxPlot', methods=['GET'])   
def hyderabadBoxPlot(): 
    graphObject = Graph() 
    # if name == "mumbai"
    fig = graphObject.box_plot(df4['Price'],'Distribution of Price(in lakhs) in Hyderabad',custom_colors[3])
    canvas = FigureCanvas(fig)
    img = io.BytesIO()
    fig.savefig(img)
    img.seek(0)
    return send_file(img,mimetype='img/png')



@app.route('/hyderabadCountPlot', methods=['GET'])   
def hyderabadCountPlot(): 
    graphObject = Graph() 
    # if name == "mumbai"
    fig = graphObject.count_plot(df4,'New and Resale Properties in Hyderabad',hyderabad)
    canvas = FigureCanvas(fig)
    img = io.BytesIO()
    fig.savefig(img)
    img.seek(0)
    return send_file(img,mimetype='img/png')


@app.route('/hyderabadScatterPlot', methods=['GET'])  
def hyderabadScatterPlot():
    graphObject =Graph()
    fig=graphObject.scatter_plot(df4,'Hyderabad',custom_colors[3])
    canvas = FigureCanvas(fig)
    img = io.BytesIO()
    fig.savefig(img)
    img.seek(0)
    return send_file(img,mimetype='img/png')


@app.route('/delhiDoublePlot', methods=['GET'])   
def delhiDoublePlot(): 
    graphObject = Graph() 
    # if name == "mumbai"
    fig = graphObject.double_plot(df2['Price'],'Distribution of Price(in lakhs) in Delhi',custom_colors[1])
    canvas = FigureCanvas(fig)
    img = io.BytesIO()
    fig.savefig(img)
    img.seek(0)
    return send_file(img,mimetype='img/png')

@app.route('/delhiBoxPlot', methods=['GET'])   
def delhiBoxPlot(): 
    graphObject = Graph() 
    # if name == "mumbai"
    fig = graphObject.box_plot(df2['Price'],'Distribution of Price(in lakhs) in Delhi',custom_colors[1])
    canvas = FigureCanvas(fig)
    img = io.BytesIO()
    fig.savefig(img)
    img.seek(0)
    return send_file(img,mimetype='img/png')    

@app.route('/delhiCountPlot', methods=['GET'])   
def delhiCountPlot(): 
    graphObject = Graph() 
    # if name == "mumbai"
    fig = graphObject.count_plot(df2,'New and Resale Properties in Delhi',delhi)
    canvas = FigureCanvas(fig)
    img = io.BytesIO()
    fig.savefig(img)
    img.seek(0)
    return send_file(img,mimetype='img/png')


@app.route('/delhiScatterPlot', methods=['GET'])  
def delhiScatterPlot():
    graphObject =Graph()
    fig=graphObject.scatter_plot(df2,'Delhi',custom_colors[1])
    canvas = FigureCanvas(fig)
    img = io.BytesIO()
    fig.savefig(img)
    img.seek(0)
    return send_file(img,mimetype='img/png')

def preprocess(df) :
    df = df[['Location','Latitude','Longitude','Price']]
    df = df.replace('NA', np.nan)
    df.dropna(subset=['Latitude'], inplace=True)
    df.dropna(subset=['Price'], inplace=True)
    df["Latitude"] = df["Latitude"].astype(float)
    df["Longitude"] = df["Longitude"].astype(float)
    return df

@app.route('/chennaiMap', methods=['GET'])  
def chennaiMap():
    map3_df = preprocess(df3)
    city_map = folium.Map(location=[13.04,80], zoom_start=10.5, tiles='Stamen Terrain')
    mc = MarkerCluster()
    for idx, row in map3_df.iterrows():
        if not math.isnan(row['Longitude']) and not math.isnan(row['Latitude']):
            popup = """
            Location : <b>%s</b><br>
            Price : <b>%s</b><br>
            """ % (row['Location'], row['Price'])
            mc.add_child(Marker([row['Latitude'], row['Longitude']],tooltip=popup))
        city_map.add_child(mc)
    return city_map._repr_html_()

@app.route('/mumbaiMap', methods=['GET'])  
def mumbaiMap():
    map1_df = preprocess(df1)
    city_map = folium.Map(location=[19.08,72.74], zoom_start=11.2, tiles='Stamen Terrain')
    mc = MarkerCluster()
    for idx, row in map1_df.iterrows():
        if not math.isnan(row['Longitude']) and not math.isnan(row['Latitude']):
            popup = """
            Location : <b>%s</b><br>
            Price : <b>%s</b><br>
            """ % (row['Location'], row['Price'])
            mc.add_child(Marker([row['Latitude'], row['Longitude']],tooltip=popup))
        city_map.add_child(mc)
    return city_map._repr_html_()

@app.route('/delhiMap', methods=['GET'])  
def delhiMap():
    map2_df = preprocess(df2)
    city_map = folium.Map(location=[28.69,76.95], zoom_start=10, tiles='Stamen Terrain')
    mc = MarkerCluster()
    for idx, row in map2_df.iterrows():
        if not math.isnan(row['Longitude']) and not math.isnan(row['Latitude']):
            popup = """
            Location : <b>%s</b><br>
            Price : <b>%s</b><br>
            """ % (row['Location'], row['Price'])
            mc.add_child(Marker([row['Latitude'], row['Longitude']],tooltip=popup))
        city_map.add_child(mc)
    return city_map._repr_html_()

@app.route('/hyderabadMap', methods=['GET'])  
def hyderabadMap():
    map4_df = preprocess(df4)
    city_map = folium.Map(location=[17.4,78.2], zoom_start=10, tiles='Stamen Terrain')
    mc = MarkerCluster()
    for idx, row in map4_df.iterrows():
        if not math.isnan(row['Longitude']) and not math.isnan(row['Latitude']):
            popup = """
            Location : <b>%s</b><br>
            Price : <b>%s</b><br>
            """ % (row['Location'], row['Price'])
            mc.add_child(Marker([row['Latitude'], row['Longitude']],tooltip=popup))
        city_map.add_child(mc)
    return city_map._repr_html_()

if __name__ == "__main__":
    app.run(debug=True)


#Step1: virtualenv flask
#Step2: source env/bin/activate